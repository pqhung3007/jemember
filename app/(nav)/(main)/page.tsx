"use client";
import AddLesson from "components/lessons/AddLesson";
import LessonList from "components/lessons/LessonList";
import LocalSearch from "components/search/LocalSearch";
import { useEffect, useState } from "react";
import { supabase } from "supabase";

import { includeString } from "utils";

export const revalidate = "force-dynamic";

const fetchAllLessons = async () => {
  const { data, error } = await supabase.from("lesson").select();

  if (error) throw new Error("An error occured while fetching lessons");

  return data;
};

export default function Home() {
  const [lessons, setLessons] = useState([] as any[]);
  const [keyWord, setKeyWord] = useState("");
  const [cardsSearch, setCardsSearch] = useState(lessons);

  useEffect(() => {
    fetchAllLessons().then((lessons) => {
      setLessons(lessons);
      setCardsSearch(lessons);
    });
  }, []);

  useEffect(() => {
    setCardsSearch(
      lessons.filter((lesson) => includeString(lesson.name, keyWord))
    );
  }, [keyWord]);

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
      <div className="col-span-full flex justify-center">
        <LocalSearch setKeyWord={setKeyWord} />
      </div>

      <LessonList lessons={cardsSearch} />
      {lessons.length < 100 && <AddLesson />}
    </div>
  );
}
