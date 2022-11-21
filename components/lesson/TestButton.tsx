import { RectangleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TestButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/test`}
      className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 py-2 pl-5 pr-7 text-sm font-medium text-white shadow-xl hover:bg-gray-700/80 hover:ring-gray-500 focus:outline-none"
    >
      <RectangleStackIcon className="h-4 w-4" />
      <p>Test</p>
    </Link>
  );
}
