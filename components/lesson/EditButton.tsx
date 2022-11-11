import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/collection/${id}/edit`}
      className="mr-2 mb-2 flex items-center gap-2 rounded-lg bg-gray-600 px-5 py-2.5 text-sm text-white hover:bg-gray-700 focus:outline-none"
    >
      <PencilIcon className="h-6 w-6 text-white" />
      <p>Edit</p>
    </Link>
  );
}
