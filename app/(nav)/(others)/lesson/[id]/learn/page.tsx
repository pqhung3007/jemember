import { notFound } from "next/navigation";
import { supabaseGetCardsByLessonId, supabaseGetLessonById } from "utils";
import LearnPage from "./LearnPage";

export default async function Learn({ params }: { params: { id: string } }) {
  const _lessonPromise = supabaseGetLessonById(params.id);
  const _cardsPromise = supabaseGetCardsByLessonId(params.id);

  const [lesson, cards] = await Promise.all([_lessonPromise, _cardsPromise]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="p-4">
      <LearnPage lesson={lesson} cards={cards} />
    </div>
  );
}
