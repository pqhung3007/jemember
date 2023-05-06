export default function PrevQuestion({
  isDisabled,
  onClick,
}: {
  isDisabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-lg bg-gray-300 px-5 py-2 font-semibold text-gray-900 hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      disabled={isDisabled}
      onClick={onClick}>
      Previous
    </button>
  );
}
