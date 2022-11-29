import { notFound } from "next/navigation";

import {
  useLessonById,
  useMarkedCardsIdByLessonId,
  useCardsByLessonId,
} from "utils/supabase/lesson/server";
import LessonPage from "./LessonPage";

export default async function Lesson({ params }: { params: { id: string } }) {
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

  return (
    <div className="px-4 pt-32 pb-32 md:pt-16 md:pl-24 lg:px-24">
      <LessonPage lesson={lesson} cards={cards} markedCards={markedCardsIds} />
    </div>
  );
}
