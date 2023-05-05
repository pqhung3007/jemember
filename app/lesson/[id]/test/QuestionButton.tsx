export default function QuestionButton({
  isAnswered,
  index,
  setCurrentQuestion,
}: {
  isAnswered: boolean;
  index: number;
  setCurrentQuestion: (index: number) => void;
}) {
  return (
    <button
      className={`rounded bg-gray-400 p-1 font-semibold text-gray-900 hover:bg-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
        isAnswered && "bg-green-400 dark:bg-green-700"
      }`}
      key={index}
      onClick={() => setCurrentQuestion(index)}>
      {index + 1}
    </button>
  );
}
