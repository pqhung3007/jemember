"use client";

import { Suspense, useEffect, useState } from "react";

import CardDetails from "components/lesson/CardDetails";
import CardSlide from "components/lesson/CardSlide";
import { CardProps, LessonBaseProps } from "types";
import {
  supabaseDeleteMarkByCardId,
  supabaseGetCardsByLessonId,
  supabaseGetMarkedCardsIdByLessonId,
  supabaseInsertMark,
} from "utils";

const CollectionListSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="duration-50 animate-pulse rounded-lg bg-neutral-800 py-[60px]"
      ></div>
    ))}
    ;
  </>
);

export default function LessonPage({ lesson }: { lesson: LessonBaseProps }) {
  const [marked, setMarked] = useState([] as string[]);
  const [cards, setCards] = useState([] as CardProps[]);

  useEffect(() => {
    supabaseGetCardsByLessonId(lesson.id).then((data) => setCards(data));
  }, []);

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
    supabaseGetMarkedCardsIdByLessonId(lesson.id).then((markedCards) => {
      setMarked(markedCards);
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

      <Suspense fallback={<CollectionListSkeleton />}>
        <CardDetails
          markedIds={marked}
          cards={cards}
          toggleMarked={toggleMarked}
        />
      </Suspense>
    </>
  );
}
