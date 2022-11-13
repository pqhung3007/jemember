import Link from "next/link";

export interface LessonCard {
  id: string;
  name: string;
  created_at: string;
}

export default function Lesson({ id, name, created_at }: LessonCard) {
  let shadow =
    "shadow-[10px_-10px_0_-3px_#14532D99,20px_-20px_0_-5px_#14532D55]";

  return (
    <Link
      href={`/lesson/${id}`}
      className={`relative rounded-lg bg-neutral-800 px-4 py-8 duration-100 hover:bg-neutral-800/70 ${shadow} hover:shadow-none`}
    >
      <p className="break-words text-xl font-semibold">
        {name?.length > 30 ? name.substring(0, 30) + "..." : name}
      </p>
      <p className="pt-4 text-neutral-400">
        {created_at}
      </p>
    </Link>
  );
}
