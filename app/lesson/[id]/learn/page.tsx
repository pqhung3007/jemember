import { notFound } from "next/navigation";
import {
  useCardsByLessonId,
  useLearnedCardsIdByLessonId,
  useLessonById,
  useMarkedCardsIdByLessonId,
} from "utils/supabase/lesson/server";
import LearnPage from "./LearnPage";

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = useLessonById(params.id);
  const _cardsPromise = useCardsByLessonId(params.id);
  const _learnedCardsIdsPromise = useLearnedCardsIdByLessonId(params.id);

  const [lesson, cards, learnedIds] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
    _learnedCardsIdsPromise,
  ]);

  if (!lesson) {
    notFound();
  }

  const markeds = await useMarkedCardsIdByLessonId(lesson.id);


  return (
    <div className="">
      <LearnPage cards={cards} markeds={markeds} learnedSnapshot={learnedIds} />
    </div>
  );
}
