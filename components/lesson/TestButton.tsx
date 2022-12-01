import { RectangleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TestButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/test`}
      className="flex h-16 items-center gap-2 rounded-2xl bg-neutral-800 pl-5 pr-7 text-xl text-white hover:bg-neutral-700 focus:outline-none md:h-10 md:rounded-full md:text-sm">
      <RectangleStackIcon className="h-6 w-6 text-neutral-300 md:h-4 md:w-4" />
      <p>Test</p>
    </Link>
  );
}
