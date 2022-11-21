"use client";

import LocalSearch from "components/search/LocalSearch";
import { useEffect, useState } from "react";
import { CardProps } from "types";
import { includeString } from "utils";
import CardDetail from "./CardDetail";

export default function CardDetails({
  cards,
  markedIds,
  toggleMarked,
}: {
  cards: CardProps[];
  markedIds: string[];
  toggleMarked: (card_id: string) => Promise<void>;
}) {
  const [cardsSearch, setCardsSearch] = useState(cards);
  const [keyWord, setKeyWord] = useState("");

  const [isMarkedOnly, setIsMarkedOnly] = useState(false);

  useEffect(() => {
    if (keyWord.trim() !== "") {
      const newResult = cards.filter(
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
      <div className="sticky top-16 py-4">
        <div className="absolute top-0 h-[2.5rem] w-full bg-slate-900"></div>
        <LocalSearch setKeyWord={setKeyWord} />
      </div>
      <div className="space-y-3">
        <div className="flex justify-end gap-4 py-3 text-slate-400">
          <button
            className={`h-10 cursor-pointer rounded-full px-5 ${
              isMarkedOnly && "bg-green-800 text-white"
            }`}
            onClick={() => setIsMarkedOnly(true)}
          >
            Marked cards ({markedIds.length || 0})
          </button>
          <button
            className={`h-10 cursor-pointer rounded-full px-5 ${
              !isMarkedOnly && "bg-green-800 text-white"
            }`}
            onClick={() => setIsMarkedOnly(false)}
          >
            All cards ({cards.length || 0})
          </button>
        </div>
        {cardsSearch.map((card, index) => (
          <CardDetail
            card={card}
            key={index}
            marked={markedIds.includes(card.id)}
            hidden={isMarkedOnly && !markedIds.includes(card.id)}
            toggleMarked={toggleMarked}
          />
        ))}
      </div>
    </div>
  );
}
