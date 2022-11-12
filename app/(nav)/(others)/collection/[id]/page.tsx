import { supabase } from "../../../../../supabase";

import { notFound } from "next/navigation";
import LessonContent from "../../../../../components/lesson/LessonContent";

export const revalidate = "force-dynamic";

const fetchCollectionById = async (id: string) => {
  const { data, error } = await supabase.from("lesson").select().eq("id", id);
  if (!error) {
    return data[0];
  }
};

const fetchCardsByCollectionId = async (lessonId: string) => {
  const { data, error } = await supabase
    .from("card")
    .select()
    .eq("collection_id", lessonId);
  if (!error) {
    return data;
  }
  return [];
};

export default async function Lesson({ params }: { params: { id: string } }) {
  const _collectionPromise = fetchCollectionById(params.id);
  const _cardsPromise = fetchCardsByCollectionId(params.id);

  const [collectionSnapshot, cards] = await Promise.all([
    _collectionPromise,
    _cardsPromise,
  ]);

  if (!collectionSnapshot) {
    notFound();
  }

  return (
    <div className="px-4 pt-10 pb-32">
      <LessonContent
        id={params.id}
        title={collectionSnapshot.name}
        cards={cards}
      />
    </div>
  );
}
