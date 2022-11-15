import { Card } from "components/lesson/Card";
import { notFound } from "next/navigation";
import { supabaseGetCardsByLessonId, fetchLessonById } from "utils";
import TestPage from "./TestPage";

interface Lesson {
  id: string;
  name: string;
}

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = fetchLessonById(params.id);
  const _cardsPromise = supabaseGetCardsByLessonId(params.id);

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
      <TestPage lesson={lesson} cards={cards} />
    </div>
  );
}
