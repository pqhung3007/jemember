import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Top() {
  return (
    <button
      className="max-sm:hidden fixed right-4 bottom-4 cursor-pointer rounded-xl bg-gray-700 p-5 focus:outline-none z-[999]"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUpIcon className="h-6 w-6 text-green-400" />
    </button>
  );
}
