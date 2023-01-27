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
        className="block w-full rounded-2xl bg-gray-700 py-3 px-6 text-xl text-white placeholder-gray-400 focus:border-green-600 focus:outline-none"
      />
    </div>
  );
}
