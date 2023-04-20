import { BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LearnButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/learn`}
      className="flex h-16 items-center gap-2 rounded-xl bg-green-300 dark:bg-green-800 pl-5 pr-7 text-xl text-green-900 dark:text-green-100 hover:bg-green-700 focus:outline-none md:h-10 md:text-sm">
      <BookOpenIcon className="h-6 w-6 text-green-900 dark:text-green-100 md:h-4 md:w-4" />
      <p>Learn</p>
    </Link>
  );
}
