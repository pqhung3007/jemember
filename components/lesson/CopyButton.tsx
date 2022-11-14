export default function CopyButton({ copy }: { copy(): void }) {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white ring-1 ring-gray-600 hover:bg-gray-700/80 hover:ring-gray-500 focus:outline-none"
      onClick={copy}
    >
      <i className="fa-regular fa-clipboard fa-md text-white"></i>
      <p>Copy</p>
    </div>
  );
}
