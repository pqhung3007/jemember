"use client";

export default function ImportFlashCard() {
  return (
    <>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        className="rounded-xl bg-gray-600 p-2 text-white focus:outline-none"
      ></textarea>
      <button
        type="button"
        className="my-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
      >
        Import
      </button>
    </>
  );
}
