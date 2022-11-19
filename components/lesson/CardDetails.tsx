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
      <div className="sticky top-24 py-4">
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
