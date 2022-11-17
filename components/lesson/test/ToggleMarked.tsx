import { Dispatch, SetStateAction } from "react";

export default function ToggleMarked({
  setIsMarkedOnly,
}: {
  setIsMarkedOnly: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="py-4">
      <input
        id="isMarkedOnly"
        type="checkbox"
        onChange={(e) => setIsMarkedOnly(e.currentTarget.checked)}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <label
        htmlFor="isMarkedOnly"
        className="ml-2 grow font-medium text-gray-900 dark:text-gray-300"
      >
        Only marked cards
      </label>
    </div>
  );
}