export default function NextQuestion({
  isDisabled,
  onClick,
}: {
  isDisabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-800 dark:hover:bg-indigo-700"
      disabled={isDisabled}
      onClick={onClick}>
      Next
    </button>
  );
}
