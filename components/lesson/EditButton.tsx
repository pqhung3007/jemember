import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/edit`}
      className="mr-2 flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-sm text-white hover:bg-green-600 focus:outline-none"
    >
      <p>Edit this lesson</p>
    </Link>
  );
}
