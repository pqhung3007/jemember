import { Suspense } from "react";
import AddCollection from "../../../components/collection/AddCollection";
import CollectionList from "../../../components/collection/CollectionList";
import RouterSearch from "../../../components/search/RouterSearch";
import { supabase } from "../../../supabase";

import { includeString } from "../../../utils";

export const revalidate = "force-dynamic";

const fetchAllCollections = async () => {
  const { data, error } = await supabase.from("lesson").select();

  if (error)
    throw new Error("An error occured while fetching collections");

  return data;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const collections = await fetchAllCollections();
  const searchResult = collections.filter((collection) =>
    includeString(collection.name, searchParams?.term ?? "")
  );

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
      <div className="col-span-full flex justify-center">
        <RouterSearch />
      </div>

      <CollectionList collections={searchResult} />
      {collections.length < 100 && <AddCollection />}
    </div>
  );
}
