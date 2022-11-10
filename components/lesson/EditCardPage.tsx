"use client";

import { collection, doc, DocumentData } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import AddFlashCard from "./AddFlashCard";
import EditFlashCard from "./EditFlashCard";
import ImportFlashCard from "./ImportFlashCard";

export default function EditCardPage(props: any) {
  // const [cards, setCards] = useState(props.cards);

  // const importCard = (content: string) => {
  //   let lines = content.split("\n\n");
  //   for (let i = 0; i < Math.min(100, lines.length); i++) {
  //     const [question, answer] = lines[i].split(" ------ ");
  // addDoc(cardRef, {
  //   question: question || "",
  //   answer: answer || "",
  //   collection_id: params.id as string,
  // }).catch((err) => console.log(err));
  // }
  // };

  // const insertCard = () => {
  //   if (props.cards.length >= 1000) {
  //     return;
  //   }

  //   const newFlashCardRef = doc(collection(db, "card"));

  //   const newCard = {
  //     question: "",
  //     answer: "",
  //     collection_id: props.id as string,
  //     id: newFlashCardRef.id,
  //   };

  //   setCards([...cards, newCard]);
  // };

  // const updateCard = (newData: FlashCardData) => {
  //   // setCards(cards.map((val) => (val.id === newData.id ? newData : val)));

  //   setDoc(doc(db, "card", newData.id), {
  //     question: newData.question,
  //     answer: newData.answer,
  //     collection_id: newData.collection_id,
  //   });
  // };

  // const deleteCard = (id: string) => {
  //   deleteDoc(doc(db, "card", id));
  // };

  return (
    <div>
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
          <h1 className="text-3xl font-semibold">{props.col.data().name}</h1>
        </div>
        <ImportFlashCard />
        {/* {props.cards.map((card: DocumentData, index: number) => (
          <EditFlashCard
            index={index}
            key={index}
            id={card.id}
            info={card}
            // updateFlashCard={updateCard}
          />
        ))}
        <AddFlashCard insertCard={insertCard} /> */}
      </div>
    </div>
  );
}
