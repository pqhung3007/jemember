import Collection from "./Collection";

export default function CollectionList({ collections }: { collections: any[] }) {
  return (
    <>
      {collections.map((collection) => (
        <Collection
          key={collection.id}
          id={collection.id}
          name={collection.name}
          created_at={collection.created_at}
        />
      ))}
    </>
  );
}
