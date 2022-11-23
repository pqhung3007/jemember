import { notFound } from "next/navigation";
import {
  useCardsByLessonId,
  useLessonById,
  useMarkedCardsIdByLessonId,
} from "utils/supabase/lesson/server";
import TestPage from "./TestPage";

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = useLessonById(params.id);
  const _cardsPromise = useCardsByLessonId(params.id);
  const _markedCardsIdsPromise = useMarkedCardsIdByLessonId(params.id);

  const [lesson, cards, markedCardsIds] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
    _markedCardsIdsPromise,
  ]);

  if (!lesson) {
    notFound();
  }

  const marked = cards.filter((card) => markedCardsIds.includes(card.id));

  return (
    <div className="p-4 pt-32 md:pl-24 lg:px-24">
      <TestPage cards={cards} marked={marked} />
    </div>
  );
}
