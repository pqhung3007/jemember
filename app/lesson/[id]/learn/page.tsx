import { notFound } from "next/navigation";
import {
  useCardsByLessonId,
  useLearnedCardsIdByLessonId,
  useLessonById,
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

  return (
    <div className="">
      <LearnPage lesson={lesson} cards={cards} learnedSnapshot={learnedIds} />
    </div>
  );
}
