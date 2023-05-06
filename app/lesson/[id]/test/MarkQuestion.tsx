import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";

export default function MarkQuestion({
  isMarked,
  onClick,
}: {
  isMarked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="mr-4 rounded-lg font-semibold text-gray-900 disabled:cursor-not-allowed dark:text-gray-200"
      onClick={onClick}>
      {isMarked ? (
        <SolidBookmarkIcon className="inline h-6 w-6 text-yellow-500" />
      ) : (
        <BookmarkIcon className="inline h-6 w-6" />
      )}
    </button>
  );
}
