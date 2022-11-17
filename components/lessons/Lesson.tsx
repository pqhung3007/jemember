import Link from "next/link";
import { LessonBaseProps } from "types";

export default function LessonCard({ id, name, created_at }: LessonBaseProps) {
  let shadow =
    "shadow-[10px_-10px_0_-3px_#14532D99,20px_-20px_0_-5px_#14532D55]";

  return (
    <Link
      href={`/lesson/${id}`}
      className={`relative rounded-lg bg-gray-800 px-4 py-8 duration-200 hover:bg-green-600/50 ${shadow} hover:shadow-none`}
    >
      <p className="break-words text-xl font-semibold">
        {name?.length > 30 ? name.substring(0, 30) + "..." : name}
      </p>
      <p className="pt-4 text-gray-300/90">
        {new Date(created_at).toLocaleString("vi-VN")}
      </p>
    </Link>
  );
}
