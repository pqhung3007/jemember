"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CurrentCard from "components/lesson/learn/CurrentCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, LessonBase } from "type";
import { supabaseLearnCard } from "utils/supabase/lesson/client";

export default function LearnPage({
  lesson,
  cards,
  learnedSnapshot,
}: {
  lesson: LessonBase;
  cards: Card[];
  learnedSnapshot: string[];
}) {
  const firstCardNotLearned = () => {
    for (const card of cards) {
      if (!finished.includes(card.id)) {
        return card;
      }
    }
    return {} as Card;
  };

  const [finished, setFinished] = useState(learnedSnapshot);
  const [learnedCount, setLearnedCount] = useState(learnedSnapshot.length);
  const [current, setCurrent] = useState(firstCardNotLearned());

  useEffect(() => {
    setCurrent(firstCardNotLearned);
  }, [finished]);

  const processCard = async (cardId: string, isCorrect: boolean) => {
    setFinished([...finished, cardId]);
    if (isCorrect) {
      await supabaseLearnCard(cardId);
    }
    setLearnedCount(learnedCount + 1);
  };

  return (
    <div className="relative flex h-screen items-center justify-center p-4">
      <a href="./" className="absolute top-4 left-4 flex text-neutral-300">
        <ChevronLeftIcon className="mr-4 h-6 w-6" />
        <p>Back</p>
      </a>
      <div className="">
        <CurrentCard card={current} process={processCard} />
        <div className="mx-auto max-w-[950px] pt-6">
          <div className="mb-6 h-2 w-full rounded-full bg-neutral-800">
            <div
              className="h-2 rounded-full bg-green-700"
              style={{
                width: (learnedCount * 100) / cards.length + "%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
