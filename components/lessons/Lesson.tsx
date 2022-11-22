import Link from "next/link";
import { LessonBase } from "type";

export default function LessonCard({ id, name, created_at }: LessonBase) {
  const shadow =
    "shadow-[10px_-10px_0_-3px_#1D294F,20px_-20px_0_-5px_#1D294F55]";

  return (
    <Link
      href={`/lesson/${id}`}
      className={`relative rounded-lg bg-slate-800 px-4 py-8 duration-200 hover:bg-slate-600/50 ${shadow} hover:shadow-none`}
    >
      <p className="break-words text-xl font-semibold">
        {name?.length > 30 ? name.substring(0, 30) + "..." : name}
      </p>
      <p className="pt-4 text-slate-300/90">
        {new Date(created_at).toLocaleString("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}
      </p>
    </Link>
  );
}
