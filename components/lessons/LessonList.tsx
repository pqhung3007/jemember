import { useLessonsByName } from "utils/supabase/lesson/server";
import { use } from "react";

import LessonCard from "./LessonCard";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function LessonList({ lessonName }: { lessonName: string }) {
  const lessons = use(useLessonsByName(lessonName));

  if (lessons.length === 0)
    return (
      <div className="col-span-full flex flex-col items-center gap-4">
        <p className="text-center text-2xl">No lessons found</p>
        <Link
          href="/lesson/new"
          className="flex items-center gap-3 rounded-full bg-gray-700 px-5 py-4 hover:bg-green-700">
          <PlusIcon className="h-6 w-6 text-gray-300" />
          Add a lesson
        </Link>
      </div>
    );

  return (
    <>
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          id={lesson.id}
          name={lesson.name}
          created_at={lesson.created_at}
        />
      ))}
    </>
  );
}
