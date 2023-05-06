"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function NextCard({
  isDisabled,
  next,
}: {
  isDisabled: boolean;
  next: () => void;
}) {
  return (
    <button
      className="group flex grow justify-center rounded-xl bg-indigo-600 p-3 hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-indigo-700 dark:disabled:bg-gray-600"
      onClick={next}
      aria-label="next"
      disabled={isDisabled}>
      <ChevronRightIcon className="h-6 w-6 text-white" />
    </button>
  );
}
