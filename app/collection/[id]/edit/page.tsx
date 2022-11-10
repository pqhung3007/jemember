import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { notFound } from "next/navigation";
import EditCardPage from "../../../../components/lesson/EditCardPage";
import { db } from "../../../../firebase";

export const revalidate = "force-dynamic";

const fetchCollectionById = async (id: string) => {
  const collectionRef = collection(db, "collection");
  const thisCollection = doc(collectionRef, id);
  const collectionSnapshot = await getDoc(thisCollection);

  return collectionSnapshot;
}

const fetchCardsByCollectionId = async (id: string) => {
  const cardRef = collection(db, "card");
  let getCardsByCollectionIdQuery = query(
    cardRef,
    where("collection_id", "==", id)
  );
  const docSnap = await getDocs(getCardsByCollectionIdQuery);
  return docSnap.docs.map(cardSnapshot => cardSnapshot.data());
}

export default async function Lesson({ params }: { params: { id: string } }) {
  const _collectionPromise = fetchCollectionById(params.id);
  const _cardsPromise = fetchCardsByCollectionId(params.id);

  const [collectionSnapshot, cards] = await Promise.all([_collectionPromise, _cardsPromise]);

  if (!collectionSnapshot.exists()) {
    notFound();
  }

  return (
    <div className="p-4">
      {/* <LessonContent id={params.id} title={collectionSnapshot.data()?.name} cards={cards} /> */}
      <EditCardPage col={collectionSnapshot}/>
    </div>
  );
}

//   return (
//     <div>
//     </div>
//   );
// }
