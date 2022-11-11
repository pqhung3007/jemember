import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

import { notFound } from "next/navigation";
import LessonContent from "../../../components/lesson/LessonContent";


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
    <div className="px-4 pt-10 pb-32">
      <LessonContent id={params.id} title={collectionSnapshot.data()?.name} cards={cards} />
    </div>
  );
}
