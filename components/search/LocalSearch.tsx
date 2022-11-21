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
      <div className="pointer-events-none absolute inset-y-0 m-4 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-6 w-6 text-slate-400" />
      </div>
      <input
        onChange={(e) => setKeyWord(e.currentTarget.value)}
        type="search"
        size={40}
        className="block w-full rounded-full bg-slate-700 py-3 pl-20 text-xl text-white placeholder-slate-400 shadow-lg focus:border-green-600 focus:outline-none"
      />
    </div>
  );
}
