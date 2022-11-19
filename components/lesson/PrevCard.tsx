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
      className="inline-block rounded-xl bg-green-700 px-3 py-3 disabled:cursor-not-allowed disabled:bg-gray-700 lg:px-5"
      onClick={prev}
      name="prev"
      disabled={isDisabled}
    >
      <ChevronLeftIcon className="h-6 w-6" />
    </button>
  );
}
