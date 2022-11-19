import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddLesson() {
  return (
    <Link
      href="/lesson/new"
      className="flex items-center justify-center gap-4 rounded-lg bg-green-700 px-4 py-8 hover:bg-green-600"
    >
      <PlusIcon className="h-6 w-6 text-green-200" />
      <p className="font-semibold text-green-100">Add lesson</p>
    </Link>
  );
}
