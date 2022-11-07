import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { db } from '../../firebase';
import Flashcard from "../components/Flashcard";
import Header from "../components/Header";

export default function Lesson() {
  const router = useRouter()
  const cardRef = collection(db, 'card');
  const [index, setIndex] = useState(0);

  const [collections, setCollections] = useState([] as DocumentData[]);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const fetch = async (id: string) => {
    const docSnap = await getDocs(query(cardRef, where("collection_id", "==", id)));
    return docSnap.docs;
  }

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id
      fetch(id as string).then(
        data => {
          setCollections(data.map(data => data.data()));
          forceUpdate();
        }
      )
    }
  }, [router.isReady]);

  let isPrevButtonDisabled = index <= 0 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-700 cursor-pointer";
  let isNextButtonDisabled = index >= (collections == null ? 1 : collections.length) - 1 ? "bg-gray-700 cursor-not-allowed" : "bg-blue-700 cursor-pointer";

  let percent = (index + 1) * 100 / (collections == null ? 1 : collections.length) + "%";

  const next = () => {
    if (index < (collections == null ? 0 : collections.length) - 1) {
      setIndex(index + 1);
    }
  }

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Header />
      <div className="">
        <div className="max-w-[1500px] px-5 py-6 mx-auto flex items-center justify-center gap-10">
          <div className={`inline-block cursor-pointer px-5 py-3 ${isPrevButtonDisabled} rounded-xl`} onClick={prev}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>


          {collections &&
            <Flashcard info={collections[index]} />
          }

          <div className={`inline-block cursor-pointer px-5 py-3 ${isNextButtonDisabled} rounded-xl`}
            onClick={next}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="max-w-[1500px] px-5 py-6 mx-auto">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: percent }}></div>
        </div>
      </div>
    </div >
  )
}
