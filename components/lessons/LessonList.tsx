"use client";

import Lesson from "./Lesson";

export default function LessonList({ lessons }: { lessons: any[] }) {
  return (
    <>
      {lessons.map((lesson) => (
        <Lesson
          key={lesson.id}
          id={lesson.id}
          name={lesson.name}
          created_at={lesson.created_at}
        />
      ))}
    </>
  );
}
