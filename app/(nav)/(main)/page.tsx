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

  await new Promise((resolve) => setTimeout(resolve, 5000));
  return data;
};

const CollectionListSkeleton = () => (
  <>
    {[...Array(6)].map((_, i) => (
      <div key={i} className="rounded-lg bg-neutral-800 py-[60px] duration-50 animate-pulse"></div>
    ))};
  </>
) 

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

      <Suspense fallback={<CollectionListSkeleton />}>
        <CollectionList collections={searchResult} />
        {collections.length < 100 && <AddCollection />}
      </Suspense>
    </div>
  );
}
