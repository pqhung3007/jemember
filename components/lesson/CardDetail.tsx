import { StarIcon } from "@heroicons/react/24/outline";
import { CardProps } from "types";

export default function CardDetail({
  card,
  marked,
  hidden,
  toggleMarked,
}: {
  card: CardProps;
  marked: boolean;
  hidden: boolean;
  toggleMarked: (card_id: string) => Promise<void>;
}) {
  return (
    <div
      className={`grid grid-cols-[repeat(13,1fr)] rounded-xl bg-gray-800 p-5 ${
        hidden && "hidden"
      }`}
    >
      <div className="col-span-9 whitespace-pre-wrap pr-2">{card.question}</div>
      <div className="col-span-3 whitespace-pre-wrap border-l border-gray-600 pr-2 pl-4">
        {card.answer}
      </div>
      <div className="col-span-1 cursor-pointer">
        <div
          className="h-6 w-6 text-yellow-400"
          onClick={() => toggleMarked(card.id)}
        >
          {marked ? (
            <StarIcon className="text-yellow-400" />
          ) : (
            <StarIcon className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
