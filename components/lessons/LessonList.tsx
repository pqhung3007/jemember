"use client";

import { LessonBaseProps } from "types";
import LessonCard from "./Lesson";

export default function LessonList({
  lessons,
}: {
  lessons: LessonBaseProps[];
}) {
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
