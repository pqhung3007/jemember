import { useRouter } from "next/router";
import Header from "../components/Header";
import { db } from '../../firebase';
import { collection, query, orderBy, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Flashcard, { FlashCard } from "../components/Flashcard";
import { useState } from "react";

export default function Lesson() {
  const router = useRouter()
  const { id } = router.query
  const messagesRef = collection(db, 'card');
  const q = query(messagesRef, where("collection_id", "==", "9d3LwC54Htqjmt0NO8S5"));
  const [index, setIndex] = useState(0);

  const [collections] = useCollectionData(q);

  let isPrevButtonDisabled = index <= 0 ? "bg-gray-700" : "bg-blue-700";
  let isNextButtonDisabled = index >= (collections == null ? 0 : collections.length) - 1 ? "bg-gray-700" : "bg-blue-700";

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
      <div className="max-w-[1500px] px-5 py-6 mx-auto flex items-center justify-center gap-10">
        <div className={`inline-block cursor-pointer px-5 py-3 ${isPrevButtonDisabled} rounded-xl`} onClick={prev}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>

        {collections &&
          <Flashcard {...collections[index] as FlashCard} />
        }

        <div className={`inline-block cursor-pointer px-5 py-3 ${isNextButtonDisabled} rounded-xl`}
          onClick={next}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  )
}
