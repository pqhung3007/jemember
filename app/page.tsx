import RouterSearch from "components/search/RouterSearch";
import LessonCard from "components/lessons/Lesson";

import { useLessonsByName } from "utils/supabase/lesson/server";

export const dynamic = "auto",
  revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams?: { name?: string };
}) {
  const lessons = await useLessonsByName(searchParams?.name ?? "");

  const LessonList =
    lessons.length == 0 ? (
      <p className="col-span-full text-center text-2xl">No lessons found</p>
    ) : (
      lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          id={lesson.id}
          name={lesson.name}
          created_at={lesson.created_at}
        />
      ))
    );

  return (
    <div className="relative pt-24 md:pl-24 lg:px-24">
      <div className="flex justify-center pb-8">
        <RouterSearch searchParamName="name" />
      </div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 pt-6 pb-20">
        {LessonList}
      </div>
    </div>
  );
}
