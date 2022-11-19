import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddCard({
  insertCard,
}: {
  insertCard: () => Promise<void>;
}) {
  return (
    <div
      className="my-4 flex cursor-pointer justify-center rounded-xl bg-green-700 py-8 text-xl hover:bg-green-600/90"
      onClick={insertCard}
    >
      <div className="flex items-center gap-2">
        <PlusIcon className="h-6 w-6 cursor-pointer text-green-300" />
        <p className="font-semibold">Thêm thẻ</p>
      </div>
    </div>
  );
}
