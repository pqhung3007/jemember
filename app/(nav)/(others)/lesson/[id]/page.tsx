import { notFound } from "next/navigation";
import { supabaseGetLessonById } from "utils";
import LessonPage from "./LessonPage";

export default async function Lesson({ params }: { params: { id: string } }) {
  const _lessonPromise = supabaseGetLessonById(params.id);

  const [lesson] = await Promise.all([_lessonPromise]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="px-4 pt-10 pb-32">
      <LessonPage lesson={lesson} />
    </div>
  );
}
