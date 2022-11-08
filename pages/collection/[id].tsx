import { collection, doc, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { db } from '../../firebase';
import Flashcard from "../components/Flashcard";
import Header from "../components/Header";

export default function Lesson() {
  const router = useRouter()
  const cardRef = collection(db, 'card');
  const collectionRef = collection(db, 'collection');

  const [isFront, setIsFront] = useState(true);

  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [flashCards, setFlashCard] = useState([] as DocumentData[]);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const fetch = async (id: string) => {
    const docSnap = await getDocs(query(cardRef, where("collection_id", "==", id)));
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
        err => console.error(err)
      );

      fetch(id).then(
        querySnapshot => {
          setFlashCard(querySnapshot.map(documentSnapshot => documentSnapshot.data()));
          forceUpdate();
        }
      ).catch(
        err => console.error(err)
      )
    }
  }, [router.isReady]);

  let isPrevButtonDisabled = index <= 0 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-700 cursor-pointer";
  let isNextButtonDisabled = index >= (flashCards == null ? 1 : flashCards.length) - 1 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-700 cursor-pointer";

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
      navigator.clipboard.writeText(flashCards[index]?.question);
    } else {
      navigator.clipboard.writeText(flashCards[index]?.answer);
    }
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Head>
        <title>Jmember</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="p-4">
        <div className="max-w-[700px] py-6 mx-auto gap-10">
          <h1 className="font-semibold text-3xl">{title}</h1>
        </div>
        <div className="max-w-[1500px] py-6 mx-auto flex items-center justify-center gap-[min(2vw,10px)]">
          <div className={`inline-block cursor-pointer px-5 py-3 ${isPrevButtonDisabled} rounded-xl`} onClick={prev}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>

          {flashCards &&
            <Flashcard isFront={isFront} setIsFront={setIsFront} info={flashCards[index]} />
          }

          <div className={`inline-block cursor-pointer px-5 py-3 ${isNextButtonDisabled} rounded-xl`}
            onClick={next}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
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
              <a href={`${router.query.id}/edit`}
                className="block text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </a>
              <div
                className="block text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-800 cursor-pointer" onClick={copy}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
