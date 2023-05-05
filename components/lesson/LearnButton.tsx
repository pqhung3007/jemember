import { BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LearnButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/learn`}
      className="flex h-16 items-center gap-2 rounded-xl bg-indigo-600 pl-5 pr-7 text-xl text-white hover:bg-indigo-700 focus:outline-none dark:bg-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-700 md:h-10 md:text-sm">
      <BookOpenIcon className="h-6 w-6 text-white md:h-4 md:w-4" />
      <p>Learn</p>
    </Link>
  );
}
