export default function Submit({ setDone }: { setDone: () => void }) {
  return (
    <button
      className="my-3 w-full rounded-xl bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700"
      onClick={setDone}>
      Submit
    </button>
  );
}
