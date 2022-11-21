import AddLesson from "components/lessons/AddLesson";
import LessonList from "components/lessons/LessonList";
import RouterSearch from "components/search/RouterSearch";

import { includeString, supabaseGetAllLessons } from "utils";

export const revalidate = 30;

export default async function Home({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const lessons = await supabaseGetAllLessons();

  const lessonsSearch = lessons.filter((lesson) =>
    includeString(lesson.name, searchParams?.term ?? "")
  );

  return (
    <div className="relative">
      <div className="flex justify-center pb-8">
        <RouterSearch />
      </div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
        <LessonList lessons={lessonsSearch} />
      </div>
      {lessons.length < 100 && <AddLesson />}
    </div>
  );
}
