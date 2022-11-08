import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebase";
import Nav from "../../components/Nav";
import AddFlashCard from "./AddFlashCard";
import EditFlashCard from "./EditFlashCard";
import HeadTag from "../../components/HeadTag";

interface FlashCardData {
  question: string,
  answer: string,
  collection_id: string,
  id: string,
}

export default function EditCollection() {

  const router = useRouter()
  const cardRef = collection(db, 'card');
  const collectionRef = collection(db, 'collection');
  const [cards, setCards] = useState([] as FlashCardData[]);
  const [title, setTitle] = useState("");

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const fetch = async (id: string) => {
    const docSnap = await getDocs(query(cardRef, where("collection_id", "==", id)));
    return docSnap;
  }

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string
      const thisCollection = doc(collectionRef, id);

      getDoc(thisCollection).then(collection => {
        if (!collection.exists()) {
          router.push('/')
        }
        setTitle(collection.data()?.name)
      });

      fetch(id as string).then(
        data => {
          setCards(data.docs.map(cardSnapshot => {
            return {
              question: cardSnapshot.data().question,
              answer: cardSnapshot.data().answer,
              collection_id: cardSnapshot.data().collection_id,
              id: cardSnapshot.id
            }
          }));
          forceUpdate();
        }
      )
    }
  }, [router.isReady]);

  const insertCard = () => {
    const newFlashCardRef = doc(collection(db, "card"));

    // setDoc(newFlashCardRef, {
    //   question: "",
    //   answer: "",
    //   collection_id: router.query.id as string,
    // });

    const newCard = {
      question: "",
      answer: "",
      collection_id: router.query.id as string,
      id: newFlashCardRef.id,
    };

    setCards([...cards, newCard])
  }

  const updateCard = (newData: FlashCardData) => {
    setCards(cards.map(
      val => val.id === newData.id ? newData : val
    ));

    setDoc(doc(db, 'card', newData.id), {
      question: newData.question,
      answer: newData.answer,
      collection_id: newData.collection_id,
    })
  }

  return (<div className="bg-gray-900 text-gray-200 min-h-screen">
    <HeadTag />
    <Nav />
    <div className="max-w-[1200px] px-5 py-6 mx-auto flex flex-col">
      <div className="max-w-[700px] py-6 mx-auto gap-10">
        <h1 className="font-semibold text-3xl">{title}</h1>
      </div>
      {cards.map(
        (card, index) =>
          <EditFlashCard
            index={index}
            key={index}
            id={card.id}
            info={card}
            updateFlashCard={updateCard}
          />
      )}
      <AddFlashCard insertFlashCard={insertCard} disabled={cards.length >= 1000} />
    </div>
  </div>)
}
