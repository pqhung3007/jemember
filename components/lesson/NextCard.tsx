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
      className="group flex grow justify-center rounded-xl border border-neutral-600 p-3 hover:border-neutral-400 disabled:cursor-not-allowed disabled:border-neutral-800"
      onClick={next}
      aria-label="next"
      disabled={isDisabled}
    >
      <ChevronRightIcon className="h-6 w-6 group-disabled:text-neutral-500" />
    </button>
  );
}
