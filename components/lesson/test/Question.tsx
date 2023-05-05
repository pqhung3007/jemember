import { useRef } from "react";
import { Card } from "type";
import { isAnswerCorrect } from "utils";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const parseChoicesFromQuestion = (question: string) => {
    const regex = /(?<=\n)[A-Za-z](?=[.,])/g;
    if (question.match(regex)) {
      return Array.from(new Set(question.match(regex)));
    } else {
      return ["True", "False"];
    }
  };

  const choices = parseChoicesFromQuestion(ques.question);

  const setInputBorder = () => {
    if (!isViewResult) {
      return "border-transparent";
    }
    if (isAnswerCorrect(actual, ques.answer)) {
      return "border-green-600";
    }
    return "border-red-600";
  };

  const addToAnswer = (answerToAdd: string) => {
    if (
      inputRef.current &&
      !inputRef.current.value.includes(answerToAdd) &&
      !isViewResult
    ) {
      inputRef.current.value += answerToAdd;
      updateAnswer(inputRef.current.value, index);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-gray-300 p-5 dark:border-gray-700 dark:bg-slate-800">
      <p className="whitespace-pre-wrap">{index + 1 + ". " + ques.question}</p>
      {!isViewResult && (
        <div className="flex gap-2 pt-4">
          {choices?.map((choice) => (
            <button
              className="grow rounded-lg bg-indigo-600 p-2 text-white shadow-sm dark:bg-indigo-700"
              onClick={() => addToAnswer(choice)}>
              {choice.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <div className="">
        <input
          ref={inputRef}
          type="text"
          value={actual}
          placeholder="Your answer..."
          className={`border bg-gray-300 dark:bg-gray-900 ${setInputBorder()} mt-6 w-full rounded-xl px-4 py-3 focus:outline-none`}
          onChange={(e) => updateAnswer(e.target.value, index)}
          disabled={isViewResult}
        />
      </div>
      {isViewResult && (
        <p className="text-white whitespace-pre-wrap pl-3 mt-2 py-2 rounded-md bg-indigo-600 dark:bg-indigo-800">
          Answer: {ques.answer}
        </p>
      )}
    </div>
  );
}
