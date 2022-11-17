import { notFound } from "next/navigation";
import { CardProps } from "types";
import { supabaseGetCardsByLessonId, supabaseGetLessonById } from "utils";
import TestPage from "./TestPage";

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

  let cards: CardProps[] = cardsSnapshot as CardProps[];

  return (
    <div className="p-4">
      <TestPage cards={cards} id={params.id} />
    </div>
  );
}
