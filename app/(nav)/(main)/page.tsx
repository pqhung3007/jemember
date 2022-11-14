"use client";
import AddLesson from "components/lessons/AddLesson";
import LessonList from "components/lessons/LessonList";
import RouterSearch from "components/search/RouterSearch";
import { useState } from "react";
import { supabase } from "supabase";

import { includeString } from "utils";

export const revalidate = "force-dynamic";

const fetchAllLessons = async () => {
  const { data, error } = await supabase.from("lesson").select();

  if (error) throw new Error("An error occured while fetching lessons");

  return data;
};

export default function Home({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const [lessons, setLessons] = useState([] as any[]);
  fetchAllLessons().then((lessons) => setLessons(lessons));
  const searchResult = lessons.filter((lesson) =>
    includeString(lesson.name, searchParams?.term ?? "")
  );

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
      <div className="col-span-full flex justify-center">
        <RouterSearch />
      </div>

      <LessonList lessons={searchResult} />
      {lessons.length < 100 && <AddLesson />}
    </div>
  );
}
