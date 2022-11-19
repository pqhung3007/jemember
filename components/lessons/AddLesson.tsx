import Link from "next/link";

export default function AddLesson() {
  return (
    <Link
      href="/lesson/new"
      className="flex items-center justify-center gap-4 rounded-lg bg-green-700 px-4 py-8 hover:bg-green-600"
    >
      <i className="fa-solid fa-plus fa-xl text-green-200"></i>
      <p className="font-semibold text-green-100">Add lesson</p>
    </Link>
  );
}
