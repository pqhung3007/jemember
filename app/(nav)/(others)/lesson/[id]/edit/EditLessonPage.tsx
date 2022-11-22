"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import AddCard from "components/lesson/edit/AddCard";
import EditCard from "components/lesson/edit/EditCard";
import ImportCard from "components/lesson/edit/ImportCard";
import { useRef, useState } from "react";
import { CardProps, LessonProps } from "types";
import {
  supabaseDeleteCardById,
  supabaseDeleteMarkByCardId,
  supabaseImportCard,
  supabaseInsertNewCardInLesson,
  supabaseUpdateLessonById,
  updateCardToDatabase,
} from "utils";

export default function EditLessonPage(props: LessonProps) {
  const [title, setTitle] = useState(props.lesson.name);
  const lessonNameInputRef = useRef<HTMLInputElement>(null);
  const [cards, setCards] = useState(props.cards as CardProps[]);
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
            <ChevronLeftIcon className="h-6 w-6 cursor-pointer text-white" />
          </a>
          <input
            id="name"
            className="w-full bg-transparent text-4xl font-semibold focus:outline-none"
            defaultValue={title}
            ref={lessonNameInputRef}
            onKeyDown={() => clearTimeout(typingTimer)}
            onKeyUp={updateTitle}
          />
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
