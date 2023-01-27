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
      className="group flex grow justify-center rounded-xl border border-gray-600 p-3 hover:border-gray-400 disabled:cursor-not-allowed disabled:border-gray-800"
      onClick={prev}
      aria-label="prev"
      disabled={isDisabled}
    >
      <ChevronLeftIcon className="h-6 w-6 group-disabled:text-gray-500" />
    </button>
  );
}
