"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
      <div className="relative rounded-full bg-gray-800 py-2 pl-10 pr-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
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
      <button
        type="submit"
        className="rounded-full bg-green-800 px-6 hover:bg-green-700"
      >
        Search
      </button>
    </form>
  );
}
