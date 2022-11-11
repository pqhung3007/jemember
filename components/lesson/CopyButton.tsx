import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function CopyButton({ copy }: { copy(): void }) {
  return (
    <div
      className="mr-2 mb-2 flex cursor-pointer items-center gap-2 rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
      onClick={copy}
    >
      <ClipboardIcon className="h-6 w-6 text-white" />
      <p>Copy</p>
    </div>
  );
}
