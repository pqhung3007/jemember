"use client";
import Link from "next/link";

import { useEffect } from "react";

export default function LessonError({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <h1>An error occurred</h1>
      <button onClick={reset} >Try again</button>
      <Link href="/">
        Return to home
      </Link>
    </>

  )
}
