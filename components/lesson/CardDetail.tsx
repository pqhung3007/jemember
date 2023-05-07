import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarredIcon } from "@heroicons/react/24/solid";
import { Card } from "type";

export default function CardDetail({
  card,
  marked,
  hidden,
  toggleMarked,
}: {
  card: Card;
  marked: boolean;
  hidden: boolean;
  toggleMarked: (cardId: string) => Promise<void>;
}) {
  return (
    <div
      className={`grid grid-cols-[repeat(12,1fr)] gap-6 rounded-xl border border-gray-300 bg-gray-50 p-5 dark:border-gray-600 dark:bg-gray-800 ${
        hidden && "hidden"
      }`}>
      <div className="col-span-9 whitespace-pre-wrap pr-2">{card.question}</div>
      <div className="col-span-2 whitespace-pre-wrap border-l border-gray-600 pl-4 pr-2">
        {card.answer}
      </div>
      <div className="col-span-1 cursor-pointer pl-5">
        <div className="" onClick={() => toggleMarked(card.id)}>
          {marked ? (
            <StarredIcon className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          ) : (
            <StarIcon className="h-6 w-6 text-gray-900 dark:text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
