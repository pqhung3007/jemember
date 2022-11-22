"use client";

import { useEffect, useState } from "react";

import CardDetails from "components/lesson/CardDetails";
import CardSlide from "components/lesson/CardSlide";
import { CardProps, LessonBaseProps } from "types";
import {
  supabaseDeleteMarkByCardId,
  supabaseGetCardsByLessonId,
  supabaseGetMarkedCardsIdByLessonId,
  supabaseInsertMark,
} from "utils";

export default function LessonPage({ lesson }: { lesson: LessonBaseProps }) {
  const [marked, setMarked] = useState([] as string[]);
  const [cards, setCards] = useState([] as CardProps[]);

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
    supabaseGetCardsByLessonId(lesson.id).then((data) => setCards(data));
    supabaseGetMarkedCardsIdByLessonId(lesson.id).then((markedCards) => {
      setMarked(markedCards);
    });
  });

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
