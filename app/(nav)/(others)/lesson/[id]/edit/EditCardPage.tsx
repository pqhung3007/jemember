"use client";

import { Card as CardData } from "components/lesson/Card";
import AddCard from "components/lesson/edit/AddCard";
import EditCard from "components/lesson/edit/EditCard";
import ImportCard from "components/lesson/edit/ImportCard";
import { useState } from "react";
import {
  supabaseInsertNewCardInLesson,
  supabaseDeleteCardById,
  supabaseDeleteMarkByCardId,
  updateCardToDatabase,
  supabaseImportCard,
} from "utils";

export default function EditCardPage(props: any) {
  const [cards, setCards] = useState(props.cards as CardData[]);

  const importCard = async (content: string) => {
    let { data, error } = await supabaseImportCard(content, props.lesson.id);
    if (!error) {
      setCards([...cards, ...(data as CardData[])]);
    }
  };

  const insertCard = async () => {
    if (props.cards.length >= 1000) {
      return;
    }

    const { data, error } = await supabaseInsertNewCardInLesson(
      props.lesson.id
    );

    if (!error) {
      setCards([...cards, data[0] as CardData]);
    }
  };

  const updateCard = async (newData: CardData) => {
    setCards(
      cards.map((val: CardData) => (val.id === newData.id ? newData : val))
    );
    await updateCardToDatabase(newData);
  };

  const deleteCard = async (card_id: string) => {
    await supabaseDeleteMarkByCardId(card_id);
    await supabaseDeleteCardById(card_id);

    setCards(cards.filter((card) => card.id !== card_id));
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
        {cards.map((card: CardData, index: number) => (
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
