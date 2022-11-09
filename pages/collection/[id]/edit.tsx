import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import { db } from "../../../firebase";
import HeadTag from "../../components/HeadTag";
import Nav from "../../components/Nav";
import AddFlashCard from "./AddFlashCard";
import EditFlashCard from "./EditFlashCard";

interface FlashCardData {
  question: string;
  answer: string;
  collection_id: string;
  id: string;
}

export default function EditCollection() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = collection(db, "card");
  const collectionRef = collection(db, "collection");
  const [cards, setCards] = useState([] as FlashCardData[]);
  const [title, setTitle] = useState("");

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetch = async (id: string) => {
    const docSnap = await getDocs(
      query(cardRef, where("collection_id", "==", id))
    );
    console.log("FETCH");
    return docSnap;
  };

  const importCard = () => {
    let content = textareaRef?.current?.value || "";
    let lines = content.split("\n\n");
    for (let i = 0; i < Math.min(100, lines.length); i++) {
      const [question, answer] = lines[i].split(" ------ ");
      addDoc(cardRef, {
        question: question || "",
        answer: answer || "",
        collection_id: router.query.id as string,
      }).catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      const thisCollection = doc(collectionRef, id);

      getDoc(thisCollection)
        .then((collection) => {
          if (!collection.exists()) {
            router.push("/");
          }
          setTitle(collection.data()?.name);
        })
        .catch((err) => {
          console.error(err);
          router.push("/");
        });

      fetch(id as string)
        .then((data) => {
          setCards(
            data.docs.map((cardSnapshot) => {
              return {
                question: cardSnapshot.data().question,
                answer: cardSnapshot.data().answer,
                collection_id: cardSnapshot.data().collection_id,
                id: cardSnapshot.id,
              };
            })
          );
          forceUpdate();
        })
        .catch((err) => {
          console.error(err);
          router.push("/");
        });
    }
  }, [router.isReady]);

  const insertCard = () => {
    if (cards.length >= 1000) {
      return;
    }

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

    setCards([...cards, newCard]);
  };

  const updateCard = (newData: FlashCardData) => {
    setCards(cards.map((val) => (val.id === newData.id ? newData : val)));

    setDoc(doc(db, "card", newData.id), {
      question: newData.question,
      answer: newData.answer,
      collection_id: newData.collection_id,
    });
  };

  const deleteCard = (id: string) => {
    deleteDoc(doc(db, "card", id));
  };

  return (
    <div className="min-h-screen bg-gray-900 font-[Inter] text-gray-200">
      <HeadTag />
      <Nav />
      <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-6">
        <div className="flex max-w-[700px] items-center gap-10 py-6">
          <a href="./" className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </a>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          className="rounded-xl bg-gray-600 p-2 text-white focus:outline-none"
          ref={textareaRef}
        ></textarea>
        <button
          type="button"
          onClick={importCard}
          className="my-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          Import
        </button>
        {cards.map((card, index) => (
          <EditFlashCard
            index={index}
            key={index}
            id={card.id}
            info={card}
            updateFlashCard={updateCard}
          />
        ))}
        <AddFlashCard insertFlashCard={insertCard} />
      </div>
    </div>
  );
}
