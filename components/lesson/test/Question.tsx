import { Card } from "type";

export default function Question({
  ques,
  index,
  isViewResult,
  actual,
  updateAnswer,
}: {
  ques: Card;
  index: number;
  isViewResult: boolean;
  actual: string;
  updateAnswer: (newValue: string, index: number) => void;
}) {
  const setInputBorder = () => {
    if (isViewResult) {
      if (actual.toUpperCase() === ques.answer.toUpperCase()) {
        return "border-green-600";
      } else {
        return "border-red-600";
      }
    }
    return "border-neutral-600";
  };

  return (
    <div className="rounded-2xl bg-neutral-800 p-5" key={ques.id}>
      <p className="whitespace-pre-wrap">{index + 1 + ". " + ques.question}</p>
      <div className="">
        <input
          type="text"
          placeholder="Your Answer"
          className={`border bg-neutral-900 ${setInputBorder()} mt-6 w-full rounded-full px-4 py-3 uppercase focus:outline-none`}
          onChange={(e) => updateAnswer(e.target.value, index)}
          disabled={isViewResult}
        />
      </div>
      {isViewResult && (
        <p className="whitespace-pre-wrap pt-4 pl-3">
          Actual answer: {ques.answer}
        </p>
      )}
    </div>
  );
}
