"use client";

import Link from "next/link";

export default function LessonError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  error;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
      <h1 className="mb-20 text-4xl">An error occurred</h1>

      <button
        className="mb-5 w-80 rounded-2xl bg-neutral-800 px-4 py-4 duration-200 hover:bg-green-800"
        onClick={reset}
      >
        Try again
      </button>

      <Link
        className="w-80 rounded-2xl bg-neutral-800 px-4 py-4 duration-200 hover:bg-green-800"
        href="/"
      >
        Back to homepage
      </Link>
    </div>
  );
}
