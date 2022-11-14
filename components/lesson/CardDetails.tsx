"use client";

import LocalSearch from "components/search/LocalSearch";
import { useEffect, useState } from "react";
import { includeString } from "utils";
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
  const [cardsSearch, setCardsSearch] = useState(cards);
  const [keyWord, setKeyWord] = useState("");

  const [isMarkedOnly, setIsMarkedOnly] = useState(false);

  const hiddenTrigger = (id: string) => {
    if (isMarkedOnly && !markedIds.includes(id)) {
      return "hidden";
    }
    return "";
  };

  useEffect(() => {
    if (keyWord.trim() !== "") {
      let newResult = cards.filter(
        (card) =>
          includeString(card.question, keyWord) ||
          includeString(card.answer, keyWord)
      );
      setCardsSearch(newResult);
    } else {
      setCardsSearch(cards);
    }
  }, [cards, keyWord]);

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="sticky top-0 py-4">
        <LocalSearch setKeyWord={setKeyWord} />
      </div>
      <div className="space-y-3">
        <div className="flex justify-end gap-4 py-3">
          <button
            className={`cursor-pointer rounded-lg px-3 py-1.5 ${
              isMarkedOnly && "bg-green-700 font-medium"
            }`}
            onClick={() => setIsMarkedOnly(true)}
          >
            Marked cards ({markedIds.length || 0})
          </button>
          <button
            className={`cursor-pointer rounded-lg px-3 py-1.5 ${
              !isMarkedOnly && "bg-green-700 font-medium"
            }`}
            onClick={() => setIsMarkedOnly(false)}
          >
            All cards ({cards.length || 0})
          </button>
        </div>
        {cardsSearch.map((card, index) => (
          <div
            className={`grid grid-cols-[repeat(13,1fr)] rounded-xl bg-gray-800 p-5 ${hiddenTrigger(
              card.id
            )}`}
            key={index}
          >
            <div className="col-span-9 whitespace-pre-wrap pr-2">
              {card.question}
            </div>
            <div className="col-span-3 whitespace-pre-wrap border-l border-gray-600 pr-2 pl-4">
              {card.answer}
            </div>
            <div className="col-span-1 cursor-pointer">
              <div
                className="h-6 w-6 text-yellow-400"
                onClick={() => toggleMarked(card.id)}
              >
                {markedIds.includes(card.id) ? (
                  <i className="fa-solid fa-star"></i>
                ) : (
                  <i className="fa-regular fa-star"></i>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
