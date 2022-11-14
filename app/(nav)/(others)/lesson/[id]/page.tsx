import { supabase } from "supabase";

import { notFound } from "next/navigation";
import LessonPage from "app/(nav)/(others)/lesson/[id]/LessonPage";

export const revalidate = "force-dynamic";

const fetchLessonById = async (id: string) => {
  const { data, error } = await supabase.from("lesson").select().eq("id", id);
  if (!error) {
    return data[0];
  }
};

const fetchCardsByLessonId = async (lessonId: string) => {
  const { data, error } = await supabase
    .from("card")
    .select()
    .eq("lesson_id", lessonId);
  if (!error) {
    return data;
  }
  return [];
};

export default async function Lesson({ params }: { params: { id: string } }) {
  const _lessonPromise = fetchLessonById(params.id);
  const _cardsPromise = fetchCardsByLessonId(params.id);

  const [lesson, cards] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
  ]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="px-4 pt-10 pb-32">
      <LessonPage lesson={lesson} cards={cards} />
    </div>
  );
}
