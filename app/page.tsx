import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

import AddCollection from "../components/collection/AddCollection";
import CollectionList from "../components/collection/CollectionList";
import Search from "../components/RouterSearch";

import { includeString } from "../utils";

export const revalidate = "force-dynamic";

const getAllCollections = async () => {
  const collectionRef = collection(db, "collection");
  const q = query(collectionRef, orderBy("created"));
  const docSnap = await getDocs(q);
  return docSnap.docs;
};

export default async function Home({ searchParams }: { searchParams: { term ?: string } }) {
  const collections = await getAllCollections();
  const searchResult = collections.filter(collection => includeString(collection.data().name, searchParams?.term ?? '')); 

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
      <div className="col-span-full flex justify-center">
        <Search />
      </div>
      <CollectionList collections={searchResult} />
      { collections.length < 100 && <AddCollection /> }
    </div>
  );
}
