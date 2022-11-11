import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { notFound } from "next/navigation";
import EditCardPage from "../../../../components/lesson/edit/EditCardPage";
import { db } from "../../../../firebase";

export const revalidate = "force-dynamic";

const fetchCollectionById = async (id: string) => {
  const collectionRef = collection(db, "collection");
  const thisCollection = doc(collectionRef, id);
  const collectionSnapshot = await getDoc(thisCollection);

  return collectionSnapshot;
};

const fetchCardsByCollectionId = async (id: string) => {
  const cardRef = collection(db, "card");
  let getCardsByCollectionIdQuery = query(
    cardRef,
    where("collection_id", "==", id)
  );
  const docSnap = await getDocs(getCardsByCollectionIdQuery);
  return docSnap.docs;
};

interface Collection {
  id: string;
  name: string;
}

interface Card {
  id: string;
  question: string;
  answer: string;
  collection_id: string;
}

export default async function Lesson({ params }: { params: { id: string } }) {
  const _collectionPromise = fetchCollectionById(params.id);
  const _cardsPromise = fetchCardsByCollectionId(params.id);

  const [collectionSnapshot, cardsSnapshot] = await Promise.all([
    _collectionPromise,
    _cardsPromise,
  ]);

  if (!collectionSnapshot.exists()) {
    notFound();
  }

  let collection: Collection = {
    id: collectionSnapshot.id,
    name: collectionSnapshot.data().name,
  };

  let cards: Card[] = cardsSnapshot.map((cardSnapshot) => {
    return {
      id: cardSnapshot.id,
      question: cardSnapshot.data().question,
      answer: cardSnapshot.data().answer,
      collection_id: cardSnapshot.data().collection_id,
    };
  });

  return (
    <div className="p-4">
      <EditCardPage collection={collection} cards={cards} />
    </div>
  );
}
