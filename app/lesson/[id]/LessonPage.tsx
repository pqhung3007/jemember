"use client";

import { useState } from "react";

import CardDetails from "components/lesson/CardDetails";
import CardSlide from "components/lesson/CardSlide";
import {
  supabaseDeleteMarkByCardId,
  supabaseInsertMark,
} from "utils/supabase/lesson/client";

import type { Card, LessonBase } from "type";

interface LessonPageProps {
  lesson: LessonBase;
  cards: Card[];
  markedCards: string[];
}

export default function LessonPage({ lesson, cards, markedCards }: LessonPageProps) {
  const [marked, setMarked] = useState(markedCards);

  const toggleMarked = async (card_id: string) => {
    if (!marked.includes(card_id)) {
      setMarked([...marked, card_id]);
      await supabaseInsertMark(card_id);
    } else {
      setMarked(marked.filter((id) => id !== card_id));
      await supabaseDeleteMarkByCardId(card_id);
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
    </>
  );
}
