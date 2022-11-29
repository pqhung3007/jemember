"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CurrentCard from "components/lesson/learn/CurrentCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "type";
import { supabaseLearnCard } from "utils/supabase/lesson/client";

export default function LearnPage({
  cards,
  learnedSnapshot,
}: {
  cards: Card[];
  learnedSnapshot: string[];
}) {
  const firstCardNotLearned = () => {
    for (const card of cards) {
      if (!reviewed.includes(card.id)) {
        return card;
      }
    }
    return {} as Card;
  };

  const [reviewed, setReviewed] = useState(learnedSnapshot);
  const [learnedCount, setLearnedCount] = useState(learnedSnapshot.length);
  const [current, setCurrent] = useState(firstCardNotLearned());

  useEffect(() => {
    setCurrent(firstCardNotLearned);
  }, [reviewed]);

  const processCard = async (cardId: string, isCorrect: boolean) => {
    setReviewed([...reviewed, cardId]);
    if (isCorrect) {
      await supabaseLearnCard(cardId);
    }
    setLearnedCount(learnedCount + 1);
  };

  return current.id ? (
    <div className="relative flex h-screen items-center justify-center p-4">
      <a href="./" className="absolute top-4 left-4 flex text-neutral-300">
        <ChevronLeftIcon className="mr-4 h-6 w-6" />
        <p>Back</p>
      </a>
      <div className="">
        <CurrentCard card={current} process={processCard} />
        <div className="mx-auto max-w-[800px] pt-6">
          <div className="mb-6 h-2 w-full rounded-full bg-neutral-800">
            <div
              className="h-2 rounded-full bg-green-700"
              style={{
                width: (learnedCount * 100) / cards.length + "%",
              }}></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative flex h-screen flex-col items-center justify-center gap-5 p-4">
      <div className="text-center text-4xl">
        <h1>You have finished all the cards !!!</h1>
      </div>
      <Link
        href="./"
        className="text-medium w-full rounded-full bg-neutral-700 px-5 py-4 text-center hover:bg-green-700 md:w-auto">
        Back to lesson page
      </Link>

      <Link
        href="/"
        className="text-medium w-full rounded-full bg-neutral-700 px-5 py-4 text-center hover:bg-green-700 md:w-auto">
        Back to home page
      </Link>
    </div>
  );
}
