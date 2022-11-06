import { Timestamp } from "firebase/firestore"

export interface CollectionCard {
  id: string,
  name: string,
  created: Timestamp
}

export default function Card({ id, name, created }: CollectionCard) {
  return (<a href={`/collection/${id}`} className="rounded-2xl px-4 py-8 bg-gray-800 hover:bg-gray-700">
    <p>
      {name}
    </p>
    <p className="text-gray-500">
      {new Date(created.seconds).toLocaleTimeString()}
    </p>
  </a>)
}
