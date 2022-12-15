import { Dispatch, SetStateAction } from "react";

export default function ToggleMarked({
  toggleMarked,
}: {
  toggleMarked: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="py-4">
      <input
        id="isMarkedOnly"
        type="checkbox"
        onChange={(e) => toggleMarked(e.currentTarget.checked)}
        className="h-4 w-4 rounded border-neutral-300 bg-neutral-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-blue-600"
      />
      <label
        htmlFor="isMarkedOnly"
        className="ml-2 grow font-medium text-neutral-100 dark:text-neutral-300"
      >
        Only marked cards
      </label>
    </div>
  );
}
