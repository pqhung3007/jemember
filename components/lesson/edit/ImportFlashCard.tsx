"use client";

import { useRef } from "react";

export default function ImportFlashCard({ importCard }: { importCard: any }) {
  const importRef = useRef<HTMLTextAreaElement>(null);

  const importListener = async () => {
    await importCard(importRef?.current?.value || "");
  };

  return (
    <>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        ref={importRef}
        className="rounded-xl bg-gray-600 p-2 text-white focus:outline-none"
      ></textarea>
      <button
        onClick={importListener}
        type="button"
        className="my-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
      >
        Import
      </button>
    </>
  );
}
