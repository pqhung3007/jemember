"use client";

import { useEffect, useState } from "react";

import { Card as CardData } from "components/lesson/Card";

import CardDetails from "components/lesson/CardDetails";
import CardSlide from "components/lesson/CardSlide";
import {
  supabaseGetCurrentUID,
  supabaseGetMarkedCardsIdByLessonId,
  supabaseDeleteMarkByCardId,
  supabaseInsertMark,
} from "utils";

export interface LessonProps {
  lesson: any;
  cards: CardData[];
}

export default function LessonPage({ lesson, cards }: LessonProps) {
  const [marked, setMarked] = useState([] as string[]);

  const toggleMarked = async (card_id: string) => {
    if (!marked.includes(card_id)) {
      setMarked([...marked, card_id]);
      await supabaseInsertMark(card_id);
    } else {
      setMarked(marked.filter((id) => id !== card_id));
      await supabaseDeleteMarkByCardId(card_id);
    }
  };

  useEffect(() => {
    supabaseGetCurrentUID().then((uid) => {
      supabaseGetMarkedCardsIdByLessonId(lesson.id).then((markedCards) =>
        setMarked(markedCards)
      );
    });
  }, []);

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
