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
    const regex = /(?<=\s)[A-Za-z](?=\.)/g;
    if (question.match(regex)) {
      return Array.from(new Set(question.match(regex)));
    } else {
      return ["True", "False"];
    }
  };

  const choices = parseChoicesFromQuestion(ques.question);

  const setInputBorder = () => {
    if (isViewResult) {
      if (isAnswerCorrect(actual, ques.answer)) {
        return "border-green-600";
      } else {
        return "border-red-600";
      }
    }
    return "border-gray-600";
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
    <div className="rounded-2xl bg-gray-300 dark:bg-gray-800 p-5" key={ques.id}>
      <p className="whitespace-pre-wrap">{index + 1 + ". " + ques.question}</p>
      <div className="flex gap-2 pt-4">
        {choices?.map((choice) => (
          <button
            className="grow rounded-lg border border-gray-600 p-2"
            onClick={() => addToAnswer(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div className="">
        <input
          ref={inputRef}
          type="text"
          value={actual}
          placeholder="Your answer..."
          className={`border bg-gray-200 dark:bg-gray-900 ${setInputBorder()} mt-6 w-full rounded-xl px-4 py-3 focus:outline-none`}
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
