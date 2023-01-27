import { notFound, redirect } from "next/navigation";
import {
  isEditable,
  useCardsByLessonId,
  useLessonById,
} from "utils/supabase/lesson/server";
import EditLessonPage from "./EditLessonPage";

export default async function LessonEdit({
  params,
}: {
  params: { id: string };
}) {

  const editable = await isEditable(params.id);

  if (!editable) {
    redirect("/login");
  }

  const _lessonPromise = useLessonById(params.id);
  const _cardsPromise = useCardsByLessonId(params.id);

  const [lesson, cards] = await Promise.all([_lessonPromise, _cardsPromise]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="p-4 pt-32 md:pl-24 lg:px-24">
      <EditLessonPage lesson={lesson} cards={cards} />
    </div>
  );
}
