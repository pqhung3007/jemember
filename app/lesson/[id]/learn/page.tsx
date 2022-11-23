import { notFound } from "next/navigation";
import {
  useCardsByLessonId,
  useLessonById,
} from "utils/supabase/lesson/server";
import LearnPage from "./LearnPage";

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = useLessonById(params.id);
  const _cardsPromise = useCardsByLessonId(params.id);

  const [lesson, cards] = await Promise.all([_lessonPromise, _cardsPromise]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="p-4 md:pl-24 lg:px-24">
      <LearnPage lesson={lesson} cards={cards} />
    </div>
  );
}
