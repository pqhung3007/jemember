import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { memo } from "react";
import Link from "next/link";
import { LessonBase } from "type";

const LessonCard = memo(function LessonCard({
  id,
  name,
  created_at,
}: LessonBase) {
  return (
    <Link
      href={`/lesson/${id}`}
      className="group relative rounded-2xl bg-gray-100 px-4 py-8 duration-200 hover:bg-indigo-700 hover:drop-shadow-md dark:bg-gray-800 dark:hover:bg-indigo-700">
      <div className="flex items-center break-words text-2xl font-semibold">
        <p className="group-hover:text-indigo-50 dark:group-hover:text-indigo-100">
          {name?.length > 30 ? name.substring(0, 30) + "..." : name}
        </p>
        <ArrowRightIcon className="relative left-0 h-5 w-5 text-indigo-50 opacity-0 transition-all duration-100 group-hover:left-4 group-hover:opacity-100 dark:text-indigo-200" />
      </div>
      <p className="pt-4 text-gray-500 group-hover:text-indigo-200 dark:group-hover:text-indigo-300">
        {new Date(created_at).toLocaleString("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}
      </p>
    </Link>
  );
});

export default LessonCard;
