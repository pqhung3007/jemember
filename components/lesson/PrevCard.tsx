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
      className="group inline-block disabled:cursor-not-allowed md:pr-10"
      onClick={prev}
      aria-label="prev"
      disabled={isDisabled}
    >
      <ChevronLeftIcon className="h-6 w-6 group-disabled:text-slate-500" />
    </button>
  );
}
