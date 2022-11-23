import AddLesson from "components/lessons/AddLesson";
import LessonList from "components/lessons/LessonList";
import RouterSearch from "components/search/RouterSearch";

import { useLessonsByName } from "utils/supabase/lesson/server";

export const dynamic = "auto",
  revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: { name?: string };
}) {
  const lessons = await useLessonsByName(searchParams.name ?? "");

  return (
    <div className="relative pt-24">
      <div className="flex justify-center pb-8">
        <RouterSearch searchParamName="name" />
      </div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
        <LessonList lessons={lessons} />
      </div>
      {lessons.length < 100 && <AddLesson />}
    </div>
  );
}
