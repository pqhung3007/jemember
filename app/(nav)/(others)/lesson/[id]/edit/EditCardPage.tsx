"use client";

import { Card } from "components/lesson/Card";
import AddCard from "components/lesson/edit/AddCard";
import EditCard from "components/lesson/edit/EditCard";
import ImportCard from "components/lesson/edit/ImportCard";
import { useState } from "react";
import { supabase } from "supabase";

const updateCardToDatabase = async (newData: Card) => {
  await supabase.from("card").upsert({
    id: newData.id,
    question: newData.question,
    answer: newData.answer,
    lesson_id: newData.lesson_id,
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
            lesson_id: props.lesson.id as string,
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
      lesson_id: props.lesson.id,
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

  const deleteCard = async (id: string) => {
    await supabase.from("users_mark_cards").delete().eq("card_id", id);
    await supabase.from("card").delete().eq("id", id);

    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-6">
        <div className="flex max-w-[700px] items-center gap-10 py-6">
          <a href="./" className="px-3">
            <i className="fa-solid fa-chevron-left fa-lg cursor-pointer text-white"></i>
          </a>
          <h1 className="text-3xl font-semibold">{props.lesson.name}</h1>
        </div>
        <ImportCard importCard={importCard} />
        {cards.map((card: Card, index: number) => (
          <EditCard
            index={index}
            key={index}
            id={card.id}
            info={card}
            updateCard={updateCard}
            deleteCard={deleteCard}
          />
        ))}
        <AddCard insertCard={insertCard} />
      </div>
    </div>
  );
}
