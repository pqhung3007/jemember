import { Timestamp } from "firebase/firestore"

export interface CollectionCard {
  id: string,
  name: string,
  created: Timestamp
}

export default function Card({ id, name, created }: CollectionCard) {

  let shadow = "shadow-[10px_-10px_0_-3px_var(--background),10px_-10px_var(--green),20px_-20px_0_-3px_var(--background),20px_-20px_var(--yellow),30px_-30px_0_-3px_var(--background),30px_-30px_var(--orange),40px_-40px_0_-3px_var(--background),40px_-40px_var(--red)]"

  return (
    <a href={`/collection/${id}`} className="rounded-2xl px-4 py-8 bg-gray-800 hover:bg-gray-700"
    >
      <p className="text-xl font-semibold">
        {name}
      </p>
      <p className="text-gray-500 pt-2">
        {new Date(created.seconds).toLocaleTimeString()}
      </p>
    </a>
  )
}
