"use client";

import AddCard from "components/lesson/edit/AddCard";
import EditCard from "components/lesson/edit/EditCard";
import ImportCard from "components/lesson/edit/ImportCard";
import { useState } from "react";
import { CardProps, LessonProps } from "types";
import {
  supabaseDeleteCardById,
  supabaseDeleteMarkByCardId,
  supabaseImportCard,
  supabaseInsertNewCardInLesson,
  updateCardToDatabase,
} from "utils";

export default function EditLessonPage(props: LessonProps) {
  const [cards, setCards] = useState(props.cards as CardProps[]);

  const importCard = async (content: string) => {
    const { data, error } = await supabaseImportCard(content, props.lesson.id);
    if (!error) {
      setCards([...cards, ...(data as CardProps[])]);
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
      setCards([...cards, data[0] as CardProps]);
    }
  };

  const updateCard = async (newData: CardProps) => {
    setCards(
      cards.map((val: CardProps) => (val.id === newData.id ? newData : val))
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
        {cards.map((card: CardProps, index: number) => (
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
