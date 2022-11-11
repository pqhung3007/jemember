import { notFound } from "next/navigation";
import EditCardPage from "../../../../components/lesson/edit/EditCardPage";
import { supabase } from "../../../../supabase";
export const revalidate = "force-dynamic";
import { Card } from "../../../../components/lesson/Flashcard";

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
};

interface Collection {
  id: string;
  name: string;
}

export default async function Lesson({ params }: { params: { id: string } }) {
  const _collectionPromise = fetchCollectionById(params.id);
  const _cardsPromise = fetchCardsByCollectionId(params.id);

  const [collectionSnapshot, cardsSnapshot] = await Promise.all([
    _collectionPromise,
    _cardsPromise,
  ]);

  if (!collectionSnapshot) {
    notFound();
  }

  let collection: Collection = {
    id: collectionSnapshot.id,
    name: collectionSnapshot.name,
  };

  let cards: Card[] = cardsSnapshot as Card[];

  return (
    <div className="p-4">
      <EditCardPage
        collection={collection}
        cards={cards}
      />
    </div>
  );
}
