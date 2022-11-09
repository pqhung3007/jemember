import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import AddCollection from "./components/AddCollection";
import Collection from "./components/Collection";
import HeadTag from "./components/HeadTag";
import Nav from "./components/Nav";
import Search from "./components/Search";

export default function Home() {
  const [collections, setCollections] = useState([] as QueryDocumentSnapshot[]);
  const [keyWord, setKeyWord] = useState("");
  const [searchResult, setSearchResult] = useState(
    [] as QueryDocumentSnapshot[]
  );

  const fetch = async () => {
    const collectionRef = collection(db, "collection");
    const q = query(collectionRef, orderBy("created"));
    const docSnap = await getDocs(q);
    return docSnap.docs;
  };

  useEffect(() => {
    fetch()
      .then((data) => setCollections(data || []))
      .catch((err) => console.log(err));
  }, []);

  const includeString = (first: string, second: string) => {
    return first.toLowerCase().includes(second.toLowerCase());
  };

  useEffect(() => {
    if (keyWord.trim() !== "") {
      let newResult = collections.filter((collection) =>
        includeString(collection.data().name, keyWord)
      );
      setSearchResult(newResult);
    } else {
      setSearchResult(collections);
    }
  }, [collections, keyWord]);

  return (
    <div className="min-h-screen bg-gray-900 font-[Inter] text-gray-200">
      <HeadTag />
      <Nav />
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-12 px-5 py-6">
        <div className="col-span-full flex justify-center">
          <Search setKeyWord={setKeyWord} />
        </div>
        {searchResult.map((collection) => (
          <Collection
            key={collection.id}
            id={collection.id}
            name={collection.data().name}
            created={collection.data().created}
          />
        ))}
        {collections.length < 100 && <AddCollection />}
      </div>
    </div>
  );
}
