"use client";

import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Card as CardData } from "./Card";

export default function CardDetails({
  cards,
  markedIds,
  toggleMarked,
}: {
  cards: CardData[];
  markedIds: string[];
  toggleMarked: (card_id: string) => void;
}) {
  const [isMarkedOnly, setIsMarkedOnly] = useState(false);

  const hiddenTrigger = (id: string) => {
    if (isMarkedOnly && !markedIds.includes(id)) {
      return "hidden";
    }
    return "";
  };

  return (
    <>
      <div className="flex justify-end gap-4 py-3">
        <button
          className={`cursor-pointer rounded-lg px-3 py-1.5 ${
            isMarkedOnly && "bg-green-700 hover:bg-green-600"
          }`}
          onClick={() => setIsMarkedOnly(true)}
        >
          Marked cards
        </button>
        <button
          className={`cursor-pointer rounded-lg px-3 py-1.5 ${
            !isMarkedOnly && "bg-green-700 hover:bg-green-600"
          }`}
          onClick={() => setIsMarkedOnly(false)}
        >
          All cards
        </button>
      </div>
      {cards.map((card, index) => (
        <div
          className={`grid grid-cols-[repeat(13,1fr)] gap-4 rounded-xl bg-gray-800 p-5 text-gray-300 ${hiddenTrigger(
            card.id
          )}`}
          key={index}
        >
          <div className="col-span-8 whitespace-pre-wrap">{card.question}</div>
          <div className="col-span-4 whitespace-pre-wrap border-l border-gray-600 pl-4">
            {card.answer}
          </div>
          <div className="col-span-1 cursor-pointer">
            <div className="" onClick={() => toggleMarked(card.id)}>
              {markedIds.includes(card.id) ? (
                <StarIconSolid className="h-6 w-6 text-yellow-400" />
              ) : (
                <StarIcon className="h-6 w-6 text-yellow-400" />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
