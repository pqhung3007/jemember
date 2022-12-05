"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import AddCard from "components/lesson/edit/AddCard";
import EditCard from "components/lesson/edit/EditCard";
import ImportCard from "components/lesson/edit/ImportCard";
import { useRef, useState } from "react";
import { Card, LessonProps } from "type";
import {
  supabaseDeleteCardById,
  supabaseDeleteMarkByCardId,
  supabaseImportCard,
  supabaseInsertNewCardInLesson,
  supabaseUpdateLessonById,
  updateCardToDatabase,
} from "utils/supabase/lesson/client";

export default function EditLessonPage(props: LessonProps) {
  const [title, setTitle] = useState(props.lesson.name);
  const lessonNameInputRef = useRef<HTMLInputElement>(null);
  const [cards, setCards] = useState(props.cards as Card[]);
  let typingTimer: NodeJS.Timeout;

  const updateTitle = async () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
      if (lessonNameInputRef.current?.value) {
        const newName = lessonNameInputRef.current.value;
        setTitle(newName);
        await supabaseUpdateLessonById(newName, props.lesson.id);
      }
    }, 500);
  };

  const importCard = async (
    content: string,
    isReversed: boolean,
    lineSep: string,
    cardSep: string
  ) => {
    const { data, error } = await supabaseImportCard(
      content,
      props.lesson.id,
      isReversed,
      lineSep,
      cardSep
    );
    if (!error) {
      setCards([...cards, ...(data as Card[])]);
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
      setCards([...cards, data[0] as Card]);
    }
  };

  const updateCard = async (newData: Card) => {
    setCards(cards.map((val: Card) => (val.id === newData.id ? newData : val)));
    await updateCardToDatabase(newData);
  };

  const deleteCard = async (cardId: string) => {
    await supabaseDeleteMarkByCardId(cardId);
    await supabaseDeleteCardById(cardId);

    setCards(cards.filter((card) => card.id !== cardId));
  };

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-6">
        <div className="flex max-w-[700px] items-center gap-10 py-6">
          <a href="./" className="px-3">
            <ChevronLeftIcon className="h-6 w-6 cursor-pointer text-white" />
          </a>
          <input
            id="name"
            className="w-full bg-transparent text-4xl font-semibold focus:outline-none"
            defaultValue={title ?? ""}
            ref={lessonNameInputRef}
            onKeyDown={() => clearTimeout(typingTimer)}
            onKeyUp={updateTitle}
          />
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
