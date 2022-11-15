import { Card as CardData } from "components/lesson/Card";
import { notFound } from "next/navigation";
import { supabaseGetCardsByLessonId, supabaseGetLessonById } from "utils";
import TestPage from "./TestPage";

interface Lesson {
  id: string;
  name: string;
}

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = supabaseGetLessonById(params.id);
  const _cardsPromise = supabaseGetCardsByLessonId(params.id);

  const [lessonSnapshot, cardsSnapshot] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
  ]);

  if (!lessonSnapshot) {
    notFound();
  }

  let cards: CardData[] = cardsSnapshot as CardData[];

  return (
    <div className="p-4">
      <TestPage cards={cards} id={params.id} />
    </div>
  );
}
