import Link from "next/link";

export default function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/lesson/${id}/edit`}
      className="flex h-10 items-center gap-2 rounded-full bg-green-800 px-5 text-sm text-white hover:bg-green-700 focus:outline-none"
    >
      <p>Edit</p>
    </Link>
  );
}
