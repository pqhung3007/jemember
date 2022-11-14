"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RouterSearch() {
  const router = useRouter();
  const [keyWord, setKeyWord] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(keyWord ? `/?term=${keyWord}` : "/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-5">
      <div className="relative rounded-lg border border-gray-600 bg-gray-800 py-3 pl-10 pr-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => setKeyWord(e.currentTarget.value)}
          value={keyWord}
          type="search"
          size={30}
          placeholder="Lesson's name"
          className="bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
        />
      </div>
      <button type="submit" className="rounded-lg bg-gray-800 px-4">
        Search
      </button>
    </form>
  );
}
