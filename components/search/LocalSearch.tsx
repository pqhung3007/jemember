"use client";

import { Dispatch, SetStateAction } from "react";

export default function Search({
  setKeyWord,
}: {
  setKeyWord: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative">
      <input
        onChange={(e) => setKeyWord(e.currentTarget.value)}
        type="search"
        placeholder="Search..."
        size={40}
        className="block w-full rounded-2xl border border-gray-300 bg-gray-50 px-6 py-3 text-xl placeholder-gray-700 shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
}
