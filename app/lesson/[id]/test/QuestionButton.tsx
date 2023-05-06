export default function QuestionButton({
  isAnswered,
  index,
  setCurrentQuestion,
  isMarked,
}: {
  isAnswered: boolean;
  index: number;
  setCurrentQuestion: (index: number) => void;
  isMarked: boolean;
}) {
  return (
    <button
      className={`relative rounded bg-slate-300 p-1 font-semibold text-gray-900 hover:bg-slate-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-500 dark:hover:bg-gray-700 overflow-hidden ${
        isAnswered && "bg-green-400 dark:bg-green-700"
      }`}
      key={index}
      onClick={() => setCurrentQuestion(index)}>
      {index + 1}
      {isMarked && (
        <div className="absolute right-0 top-0 h-0 w-0 border-4 border-l-transparent border-b-transparent border-red-500"></div>
      )}
    </button>
  );
}
