import { collection, doc, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { db } from '../../firebase';
import Flashcard from "./Flashcard";
import Nav from "../components/Nav";
import HeadTag from "../components/HeadTag";
import PrevCard from "./components/PrevCard";
import NextCard from "./components/NextCard";
import EditButton from "./components/EditButton";
import CopyButton from "./components/CopyButton";

export default function Lesson() {
  const router = useRouter()

  // firestore collection references
  const cardRef = collection(db, 'card');
  const collectionRef = collection(db, 'collection');

  // states
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [flashCards, setFlashCards] = useState([] as DocumentData[]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const fetch = async (id: string) => {
    let getCardsByCollectionIdQuery = query(cardRef, where("collection_id", "==", id));
    const docSnap = await getDocs(getCardsByCollectionIdQuery);
    return docSnap.docs;
  }

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      const thisCollection = doc(collectionRef, id);

      getDoc(thisCollection).then(collectionSnapshot => {
        if (!collectionSnapshot.exists()) {
          router.push('/')
        }
        setTitle(collectionSnapshot.data()?.name)
      }).catch(
        err => {
          console.error(err);
          router.push('/');
        }
      );

      fetch(id)
        .then(
          result => setFlashCards(result.map(flashCardSnapshot => flashCardSnapshot.data()))
        ).then(forceUpdate)
        .catch(
          err => {
            console.error(err);
            router.push('/');
          }
        )
    }
  }, [router.isReady]);

  let prevButtonStyle = index <= 0 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-700 cursor-pointer";
  let nextButtonStyle = index >= (flashCards == null ? 1 : flashCards.length) - 1 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-700 cursor-pointer";

  let percent = (index + 1) * 100 / (flashCards == null ? 1 : flashCards.length) + "%";

  const next = () => {
    if (index < (flashCards == null ? 0 : flashCards.length) - 1) {
      setIndex(index + 1);
      setIsFront(true);
    }
  }

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsFront(true);
    }
  }

  const copy = () => {
    if (isFront) {
      navigator.clipboard.writeText(flashCards[index] ? flashCards[index].question : "");
    } else {
      navigator.clipboard.writeText(flashCards[index] ? flashCards[index].answer : "");
    }
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <HeadTag />
      <Nav />
      <div className="p-4">
        <div className="max-w-[700px] py-6 mx-auto gap-10">
          <h1 className="font-semibold text-3xl">{title}</h1>
        </div>
        <div className="max-w-[1500px] py-6 mx-auto flex items-center justify-center gap-[min(2vw,10px)]">
          <PrevCard prevButtonStyle={prevButtonStyle} prev={prev} />
          <Flashcard isFront={isFront} setIsFront={setIsFront} info={flashCards[index]} />
          <NextCard nextButtonStyle={nextButtonStyle} next={next} />
        </div>
        <div className="max-w-[700px] py-6 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: percent }}></div>
          </div>
          <div className="flex justify-between py-5">
            <div className="">
              <p>Created by</p>
              <p>FU-JS</p>
            </div>
            <div className="flex">
              <EditButton id={router.query.id as string} />
              <CopyButton copy={copy} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
