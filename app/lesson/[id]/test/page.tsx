import { notFound } from "next/navigation";
import {
  useCardsByLessonId,
  useLessonById
} from "utils/supabase/lesson/server";
import TestPage from "./TestPage";

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = useLessonById(params.id);
  const _cardsPromise = useCardsByLessonId(params.id);

  const [lesson, cards] = await Promise.all([_lessonPromise, _cardsPromise]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="p-4 pt-10 lg:px-10">
      <TestPage cards={cards} />
    </div>
  );
}
