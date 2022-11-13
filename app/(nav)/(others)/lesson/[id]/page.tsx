import { supabase } from "supabase";

import { notFound } from "next/navigation";
import LessonContent from "components/lesson/LessonContent";

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

  const [lessonSnapshot, cards] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
  ]);

  if (!lessonSnapshot) {
    notFound();
  }

  return (
    <div className="px-4 pt-10 pb-32">
      <LessonContent
        id={params.id}
        title={lessonSnapshot.name}
        cards={cards}
      />
    </div>
  );
}
