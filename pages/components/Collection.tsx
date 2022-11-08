import { Timestamp } from "firebase/firestore";

export interface CollectionCard {
  id: string;
  name: string;
  created: Timestamp;
}

export default function Collection({ id, name, created }: CollectionCard) {
  let shadow =
    "shadow-[10px_-10px_0_-3px_var(--background),10px_-10px_var(--green),20px_-20px_0_-3px_var(--background),20px_-20px_var(--yellow),30px_-30px_0_-3px_var(--background),30px_-30px_var(--orange),40px_-40px_0_-3px_var(--background),40px_-40px_var(--red)]";

  return (
    <a
      href={`/collection/${id}`}
      className="rounded-2xl bg-gray-800 px-4 py-8 hover:bg-gray-700"
    >
      <p className="break-words text-xl font-semibold">
        {name?.length > 30 ? name.substring(0, 30) + "..." : name}
      </p>
      <p className="pt-2 text-gray-500">
        {created?.toDate().toLocaleDateString() +
          " " +
          created?.toDate().toLocaleTimeString()}
      </p>
    </a>
  );
}
