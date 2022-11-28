import { useLessonsByName } from "utils/supabase/lesson/server";
import { use } from "react";

import LessonCard from "./LessonCard";

export default function LessonList({ lessonName }: { lessonName: string }) {
  const lessons = use(useLessonsByName(lessonName));

  if (lessons.length === 0)
    return (
      <p className="col-span-full text-center text-2xl">No lessons found</p>
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
