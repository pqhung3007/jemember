import { supabase } from "supabase";
import { Card } from "components/lesson/Card";
import { notFound } from "next/navigation";
import LearnPage from "app/(nav)/(others)/collection/[id]/learn/LearnPage";

interface Collection {
  id: string;
  name: string;
}

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

export default async function Learn({ params }: { params: { id: string } }) {
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
      <LearnPage collection={collection} cards={cards} />
    </div>
  );
}
