"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

export default function Search({
  setKeyWord,
}: {
  setKeyWord: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
      </div>
      <input
        onChange={(e) => setKeyWord(e.currentTarget.value)}
        type="search"
        size={40}
        placeholder="Search"
        className="block w-full rounded-lg border border-gray-600 bg-gray-900 py-3 pl-12 text-white placeholder-gray-400 focus:border-green-600 focus:outline-none"
      />
    </div>
  );
}
