import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddLesson() {
  return (
    <Link
      href="/lesson/new"
      className="fixed bottom-5 right-5 rounded-2xl bg-green-800 py-4 pl-5 pr-7 shadow-xl hover:bg-green-700"
    >
      <div className="flex items-center gap-2">
        <PlusIcon className="h-6 w-6 text-green-100" />
        <p className="hidden text-green-100 md:block">Add lesson</p>
      </div>
    </Link>
  );
}
