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
      className="green inline-block disabled:cursor-not-allowed md:pl-10"
      onClick={next}
      aria-label="next"
      disabled={isDisabled}
    >
      <ChevronRightIcon className="h-6 w-6 group-disabled:text-slate-500" />
    </button>
  );
}
