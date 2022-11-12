"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { supabase } from "supabase";
import { Card } from "../Flashcard";
import AddFlashCard from "./AddFlashCard";
import EditFlashCard from "./EditFlashCard";
import ImportFlashCard from "./ImportFlashCard";

const updateCardToDatabase = async (newData: Card) => {
  await supabase.from("card").upsert({
    id: newData.id,
    question: newData.question,
    answer: newData.answer,
    collection_id: newData.collection_id,
  });
};

export default function EditCardPage(props: any) {
  const [cards, setCards] = useState(props.cards as Card[]);

  const importCard = async (content: string) => {
    let lines = content.split(";;;;;;");
    let { data, error } = await supabase
      .from("card")
      .insert(
        lines.map((line) => {
          const [question, answer] = line.split("&&&&&&");
          return {
            question: question || "",
            answer: answer || "",
            collection_id: props.collection.id as string,
          };
        })
      )
      .select();
    if (!error) {
      setCards([...cards, ...(data as Card[])]);
    }
  };

  const insertCard = async () => {
    if (props.cards.length >= 1000) {
      return;
    }

    const newCard = {
      question: "",
      answer: "",
      collection_id: props.collection.id,
    };

    const { data, error } = await supabase
      .from("card")
      .insert(newCard)
      .select();

    if (!error) {
      setCards([...cards, data[0] as Card]);
    }
  };

  const updateCard = async (newData: Card) => {
    setCards(cards.map((val: Card) => (val.id === newData.id ? newData : val)));
    await updateCardToDatabase(newData);
  };

  // const deleteCard = (id: string) => {
  //   deleteDoc(doc(db, "card", id));
  // };

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-6">
        <div className="flex max-w-[700px] items-center gap-10 py-6">
          <a href="./" className="px-3">
            <ChevronLeftIcon className="h-6 w-6 font-bold text-white" />
          </a>
          <h1 className="text-3xl font-semibold">{props.collection.name}</h1>
        </div>
        <ImportFlashCard importCard={importCard} />
        {cards.map((card: Card, index: number) => (
          <EditFlashCard
            index={index}
            key={index}
            id={card.id}
            info={card}
            updateCard={updateCard}
          />
        ))}
        <AddFlashCard insertCard={insertCard} />
      </div>
    </div>
  );
}
