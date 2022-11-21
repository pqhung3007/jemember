import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function CopyButton({ copy }: { copy(): void }) {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-800 py-2 pl-5 pr-7 text-sm font-medium text-white hover:bg-gray-700/80 hover:ring-gray-500 focus:outline-none"
      onClick={copy}
    >
      <ClipboardIcon className="h-4 w-4 text-gray-300" />
      <p>Copy</p>
    </div>
  );
}
