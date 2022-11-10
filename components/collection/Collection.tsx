import { Timestamp } from "firebase/firestore";

import Link from "next/link";

export interface CollectionCard {
  id: string;
  name: string;
  created: Timestamp;
}

export default function Collection({ id, name, created }: CollectionCard) {
  let shadow =
    "shadow-[10px_-10px_0_-3px_#334155cc,20px_-20px_0_-5px_#334155aa]";
  let shadowHover =
    "hover:shadow-[10px_-10px_0_-3px_#334155cc,20px_-20px_0_-5px_#334155aa,30px_-30px_0_-7px_#334155aa] hover:top-4 hover:right-4";

  return (
    <Link
      href={`/collection/${id}`}
      className={`relative rounded-2xl bg-gray-800 px-4 py-6 duration-100 hover:bg-gray-800/70 ${shadow} ${shadowHover}`}
    >
      <p className="break-words text-xl font-semibold">
        {name?.length > 30 ? name.substring(0, 30) + "..." : name}
      </p>
      <p className="pt-4 text-gray-500">
        {created?.toDate().toLocaleDateString() +
          " " +
          created?.toDate().toLocaleTimeString()}
      </p>
    </Link>
  );
}
