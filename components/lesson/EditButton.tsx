import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/edit`}
      prefetch={false}
      className="flex h-10 items-center gap-2 rounded-full bg-neutral-800 pl-5 pr-7 text-sm text-white hover:bg-neutral-700 focus:outline-none"
    >
      <PencilIcon className="h-4 w-4" />
      <p>Edit</p>
    </Link>
  );
}
