import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkedIcon } from "@heroicons/react/24/solid";
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
  toggleMarked: (card_id: string) => Promise<void>;
}) {
  return (
    <div
      className={`grid grid-cols-[repeat(12,1fr)] rounded-xl bg-slate-800 p-5 ${
        hidden && "hidden"
      }`}
    >
      <div className="col-span-9 whitespace-pre-wrap pr-2">{card.question}</div>
      <div className="col-span-2 whitespace-pre-wrap border-l border-slate-600 pr-2 pl-4">
        {card.answer}
      </div>
      <div className="col-span-1 cursor-pointer">
        <div className="h-6 w-6" onClick={() => toggleMarked(card.id)}>
          {marked ? (
            <BookmarkedIcon className="text-slate-400" />
          ) : (
            <BookmarkIcon className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
