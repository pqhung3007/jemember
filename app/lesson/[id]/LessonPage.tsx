"use client";

import { useState } from "react";

import CardDetails from "components/lesson/CardDetails";
import CardSlide from "components/lesson/CardSlide";
import {
  supabaseDeleteMarkByCardId,
  supabaseInsertMark,
} from "utils/supabase/lesson/client";

import type { Card, LessonBase } from "type";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface LessonPageProps {
  lesson: LessonBase;
  cards: Card[];
  markedCards: string[];
}

export default function LessonPage({
  lesson,
  cards,
  markedCards,
}: LessonPageProps) {
  const [marked, setMarked] = useState(markedCards);

  const toggleMarked = async (cardId: string) => {
    if (!marked.includes(cardId)) {
      setMarked([...marked, cardId]);
      await supabaseInsertMark(cardId);
    } else {
      setMarked(marked.filter((id) => id !== cardId));
      await supabaseDeleteMarkByCardId(cardId);
    }
  };

  return (
    <>
      <CardSlide
        lesson={lesson}
        cards={cards}
        marked={marked}
        toggleMarked={toggleMarked}
      />

      <CardDetails
        markedIds={marked}
        cards={cards}
        toggleMarked={toggleMarked}
      />

      <button
        className="fixed right-4 bottom-4 cursor-pointer rounded-full border border-gray-700 bg-gray-800 p-3 focus:outline-none"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUpIcon className="h-6 w-6 text-green-400" />
      </button>
    </>
  );
}
