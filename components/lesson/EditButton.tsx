import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/edit`}
      className="flex h-16 items-center gap-2 rounded-xl bg-gray-300 dark:bg-gray-800 pl-5 pr-7 text-xl dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none md:h-10 md:text-sm">
      <PencilIcon className="h-6 w-6 text-gray-800 dark:text-gray-300 md:h-4 md:w-4" />
      <p>Edit</p>
    </Link>
  );
}
