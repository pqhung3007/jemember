import { CardProps } from "types";

export default function Question({
  ques,
  index,
  isViewResult,
  actual,
  updateAnswer,
}: {
  ques: CardProps;
  index: number;
  isViewResult: boolean;
  actual: string;
  updateAnswer: (newValue: string, index: number) => void;
}) {
  const setInputBorder = (actual: string, expected: string) => {
    if (isViewResult) {
      if (actual.toUpperCase() === expected.toUpperCase()) {
        return "border-green-600";
      } else {
        return "border-red-600";
      }
    }
    return "border-gray-600";
  };

  return (
    <div
      className="rounded-lg border border-gray-600 bg-gray-800 p-5"
      key={ques.id}
    >
      <p className="whitespace-pre-wrap">{index + 1 + ". " + ques.question}</p>
      <div className="">
        <input
          type="text"
          placeholder="Answer"
          className={`border bg-gray-900 ${setInputBorder(
            actual || "",
            ques.answer
          )} my-6 w-full rounded px-4 py-2 focus:outline-none`}
          onChange={(e) => updateAnswer(e.target.value, index)}
          disabled={isViewResult}
        />
      </div>
      {isViewResult && (
        <p className="whitespace-pre-wrap">Actual answer: {ques.answer}</p>
      )}
    </div>
  );
}
