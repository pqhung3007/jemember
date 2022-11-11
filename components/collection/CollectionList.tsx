import { QueryDocumentSnapshot } from 'firebase/firestore';

import Collection from "./Collection";

export default function CollectionList({ collections }: { collections: QueryDocumentSnapshot[] }) {
  return (
    <>
      {collections.map(collection => (
        <Collection
        key={collection.id}
        id={collection.id}
        name={collection.data().name}
        created={collection.data().created}
        />
      ))}
    </>
  );
}
