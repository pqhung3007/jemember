import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import { db } from "../../firebase";
import HeadTag from "../components/HeadTag";
import Nav from "../components/Nav";
import Search from "../components/Search";
import CopyButton from "./components/CopyButton";
import EditButton from "./components/EditButton";
import NextCard from "./components/NextCard";
import PrevCard from "./components/PrevCard";
import Flashcard from "./Flashcard";

export default function Lesson() {
  const router = useRouter();

  // firestore collection references
  const cardRef = collection(db, "card");
  const collectionRef = collection(db, "collection");

  // states
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([] as DocumentData[]);
  const [cardsSearch, setCardsSearch] = useState([] as DocumentData[]);
  const [keyWord, setKeyWord] = useState("");
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetch = async (id: string) => {
    let getCardsByCollectionIdQuery = query(
      cardRef,
      where("collection_id", "==", id)
    );
    const docSnap = await getDocs(getCardsByCollectionIdQuery);
    return docSnap.docs.map((cardSnapshot) => cardSnapshot.data());
  };

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      const thisCollection = doc(collectionRef, id);

      getDoc(thisCollection)
        .then((collectionSnapshot) => {
          if (!collectionSnapshot.exists()) {
            router.push("/");
          }
          setTitle(collectionSnapshot.data()?.name);
        })
        .catch((err) => {
          console.error(err);
          router.push("/");
        });

      fetch(id)
        .then((result) => setCards(result))
        .then(forceUpdate)
        .catch((err) => {
          console.error(err);
          router.push("/");
        });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (keyWord.trim() !== "") {
      let newResult = cards.filter(
        (card) =>
          includeString(card.question, keyWord) ||
          includeString(card.answer, keyWord)
      );
      setCardsSearch(newResult);
    } else {
      setCardsSearch(cards);
    }
  }, [cards, keyWord]);

  let prevButtonStyle =
    index <= 0
      ? "bg-gray-700 cursor-not-allowed"
      : "bg-blue-700 cursor-pointer";
  let nextButtonStyle =
    index >= (cards == null ? 1 : cards.length) - 1
      ? "bg-gray-700 cursor-not-allowed"
      : "bg-blue-700 cursor-pointer";
  let percent = ((index + 1) * 100) / (cards == null ? 1 : cards.length) + "%";

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const processKeyBinding = (event: any) => {
    if (
      event.key === " " ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      setIsFront(!isFront);
    } else if (event.key === "ArrowLeft") {
      prev();
    } else if (event.key === "ArrowRight") {
      next();
    }
  };

  const prev = () => {
    if (index > 0) {
      setIsFront(true);
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < (cards == null ? 0 : cards.length) - 1) {
      setIsFront(true);
      setIndex(index + 1);
    }
  };

  const copy = () => {
    if (isFront) {
      navigator.clipboard.writeText(cards[index] ? cards[index].question : "");
    } else {
      navigator.clipboard.writeText(cards[index] ? cards[index].answer : "");
    }
  };

  const includeString = (first: string, second: string) => {
    return first.toLowerCase().includes(second.toLowerCase());
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-gray-200"
      tabIndex={0}
      onKeyDown={processKeyBinding}
      ref={containerRef}
    >
      <HeadTag />
      <Nav />
      <div className="p-4">
        <div className="mx-auto max-w-[700px] gap-10 py-6">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-[min(2vw,10px)] py-6">
          <PrevCard prevButtonStyle={prevButtonStyle} prev={prev} />
          <Flashcard
            isFront={isFront}
            setIsFront={setIsFront}
            info={cards[index]}
          />
          <NextCard nextButtonStyle={nextButtonStyle} next={next} />
        </div>
        <div className="mx-auto max-w-[800px] py-6">
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full bg-blue-600"
              style={{ width: percent }}
            ></div>
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
          <div className="space-y-3">
            <Search setKeyWord={setKeyWord} />
            {cardsSearch.map((card) => (
              <div className="grid grid-cols-3 gap-4 rounded-xl bg-gray-800 p-5">
                <div className="col-span-2 whitespace-pre-wrap">
                  {card.question}
                </div>
                <div className="col-span-1 whitespace-pre-wrap border-l border-gray-600 pl-4">
                  {card.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
