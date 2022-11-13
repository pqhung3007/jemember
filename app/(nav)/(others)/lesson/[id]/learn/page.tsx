import { supabase } from "supabase";
import { Card } from "components/lesson/Card";
import { notFound } from "next/navigation";
import LearnPage from "app/(nav)/(others)/lesson/[id]/learn/LearnPage";

interface Lesson {
  id: string;
  name: string;
}

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

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = fetchLessonById(params.id);
  const _cardsPromise = fetchCardsByLessonId(params.id);

  const [lessonSnapshot, cardsSnapshot] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
  ]);

  if (!lessonSnapshot) {
    notFound();
  }

  let lesson: Lesson = {
    id: lessonSnapshot.id,
    name: lessonSnapshot.name,
  };

  let cards: Card[] = cardsSnapshot as Card[];

  return (
    <div className="p-4">
      <LearnPage lesson={lesson} cards={cards} />
    </div>
  );
}
