import EditCardPage from "app/(nav)/(others)/lesson/[id]/edit/EditCardPage";
import { Card } from "components/lesson/Card";
import { notFound } from "next/navigation";
import { supabaseGetCardsByLessonId, fetchLessonById } from "utils";
export const revalidate = "force-dynamic";

interface Lesson {
  id: string;
  name: string;
}

export default async function Lesson({ params }: { params: { id: string } }) {
  const _lessonPromise = fetchLessonById(params.id);
  const _cardsPromise = supabaseGetCardsByLessonId(params.id);

  const [lessonSnapshot, cardsSnapshot] = await Promise.all([
    _lessonPromise,
    _cardsPromise,
  ]);

  if (!lessonSnapshot) {
    notFound();
  }

  let lesson: Lesson = {
    id: lessonSnapshot.id,
    name: lessonSnapshot.name,
  };

  let cards: Card[] = cardsSnapshot as Card[];

  return (
    <div className="p-4">
      <EditCardPage lesson={lesson} cards={cards} />
    </div>
  );
}
