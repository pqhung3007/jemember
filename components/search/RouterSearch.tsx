"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function RouterSearch({
  searchParamName,
}: {
  searchParamName: string;
}) {
  const router = useRouter();
  const [keyWord, setKeyWord] = useState("");

  const refresh = () => router.refresh();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(keyWord ? `/?${searchParamName}=${keyWord}` : "/");
  };

  useEffect(() => {
    window.addEventListener("popstate", refresh);

    return () => window.removeEventListener("popstate", refresh);
  });

  return (
    <form onSubmit={handleSubmit} className="gap-5 p-3 sm:flex">
      <div className="relative flex rounded-2xl border border-gray-300 bg-gray-50 py-2 pl-12 pr-4 dark:border-gray-600 dark:bg-gray-800">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          onChange={(e) => setKeyWord(e.currentTarget.value)}
          value={keyWord}
          type="search"
          placeholder="Search"
          className="w-full bg-transparent text-lg placeholder-gray-500 focus:outline-none dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="rounded-2xl bg-indigo-600 px-8 py-3 text-lg text-white hover:bg-indigo-700 dark:bg-indigo-800 max-sm:my-4 max-sm:w-full">
        Search
      </button>
    </form>
  );
}
