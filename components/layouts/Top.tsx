import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Top() {
  return (
    <button
      className="fixed bottom-4 right-4 z-[999] cursor-pointer rounded-xl bg-gray-300 p-5 focus:outline-none dark:bg-gray-700 max-sm:hidden"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUpIcon className="h-6 w-6 text-indigo-700 dark:text-indigo-400" />
    </button>
  );
}
