import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function CopyButton({ copy }: { copy(): void }) {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white ring-1 ring-gray-600 hover:bg-gray-700/80 hover:ring-gray-500 focus:outline-none"
      onClick={copy}
    >
      <ClipboardIcon className="h-4 w-4 text-white" />
      <p>Copy</p>
    </div>
  );
}
