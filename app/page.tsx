import RouterSearch from "components/search/RouterSearch";
import LessonList from "components/lessons/LessonList";
import LessonListSkeleton from "components/lessons/LessonListSkeleton";

import { Suspense } from "react";

export const dynamic = "auto",
  revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams?: { name?: string };
}) {
  return (
    <div className="relative pt-24 md:pl-24 lg:px-24">
      <div className="flex justify-center pb-8">
        <RouterSearch searchParamName="name" />
      </div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 pt-6 pb-20">
        <Suspense fallback={<LessonListSkeleton />}>
          <LessonList lessonName={searchParams?.name ?? ""} />
        </Suspense>
      </div>
    </div>
  );
}
