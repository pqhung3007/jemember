"use client";
import Link from "next/link";

export default function LessonError({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);
  return (
    <>
      <h1>An error occurred</h1>
      <Link href="/">
        Return to home
      </Link>
    </>

  )
}
