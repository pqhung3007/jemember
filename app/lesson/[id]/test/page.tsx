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

  const [lessonSnapshot, cardsSnapshot, markedCardsIds] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
    _markedCardsIdsPromise,
  ]);

  if (!lessonSnapshot) {
    notFound();
  }

  return (
    <div className="p-4">
      <TestPage cards={cardsSnapshot} markedCardsIds={markedCardsIds} />
    </div>
  );
}
