import { BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LearnButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/learn`}
      prefetch={false}
      className="flex h-10 items-center gap-2 rounded-full bg-green-800 pl-5 pr-7 text-sm text-white hover:bg-green-700 focus:outline-none"
    >
      <BookOpenIcon className="h-4 w-4" />
      <p>Learn</p>
    </Link>
  );
}
