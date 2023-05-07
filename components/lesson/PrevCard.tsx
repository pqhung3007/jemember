"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function PrevCard({
  isDisabled,
  prev,
}: {
  isDisabled: boolean;
  prev: () => void;
}) {
  return (
    <button
      className="group flex grow justify-center rounded-xl bg-indigo-600 p-3 hover:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-300 dark:bg-indigo-700 dark:disabled:bg-gray-600"
      onClick={prev}
      aria-label="prev"
      disabled={isDisabled}>
      <ChevronLeftIcon className="h-6 w-6 text-white" />
    </button>
  );
}
