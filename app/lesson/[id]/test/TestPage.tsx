"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Question from "components/lesson/test/Question";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Card } from "type";

import { replaceAt } from "utils";

export default function TestPage({
  cards,
  marked,
}: {
  cards: Card[];
  marked: Card[];
}) {
  const lengthRef = useRef<HTMLInputElement>(null);
  const [isViewResult, setIsViewResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState(new Array(cards.length).fill(""));

  const updateAnswer = (newValue: string, index: number) => {
    setAnswers(replaceAt(answers, index, newValue));
  };

  const grading = useCallback(() => {
    let count = 0;
    for (let i = 0; i < answers.length; i++) {
      if (isAnswerCorrect(answers[i], cards[i].answer)) {
        count++;
      }
    }
    return count;
  }, [isViewResult]);

  const isAnswerCorrect = (actual: string, expected: string) => {
    return actual.toLowerCase() === expected.toLowerCase();
  };

  return (
    <div className="mx-auto flex flex-col gap-5 pb-20">
      <Link className="flex items-center gap-4" href=".">
        <ArrowLeftIcon className="h-6 w-6 " />
        Back
      </Link>
      {isViewResult && (
        <div
          className={`rounded-xl ${
            grading() * 2 > cards.length
              ? "bg-green-400 text-green-900 dark:bg-green-700 dark:text-green-200"
              : "bg-red-400 text-red-900 dark:bg-red-700 dark:text-red-200"
          } p-6 text-center text-2xl font-semibold`}>
          Grade: {grading() + "/" + cards.length}
        </div>
      )}
      <div className="flex gap-2">
        <div className="flex h-full grow-[4] flex-col justify-between self-stretch">
          <Question
            key={currentQuestion}
            ques={cards[currentQuestion]}
            index={currentQuestion}
            actual={answers[currentQuestion]}
            isViewResult={isViewResult}
            updateAnswer={updateAnswer}
          />
          <div className="flex gap-3 py-4">
            <button
              className="rounded-lg bg-gray-400 p-2 font-semibold text-gray-900 hover:bg-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}>
              Previous
            </button>
            <button
              className="rounded-lg bg-gray-400 p-2 font-semibold text-gray-900 hover:bg-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              Next
            </button>
          </div>
        </div>
        <div className="grid w-[40ch] grid-cols-9 gap-1">
          {cards.map((card, index) => (
            <button
              className={`rounded bg-gray-400 p-1 font-semibold text-gray-900 hover:bg-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
                answers[index] && "bg-green-400 dark:bg-green-700"
              }`}
              onClick={() => setCurrentQuestion(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {!isViewResult && (
        <button
          className="rounded-xl bg-gray-400 py-3 font-semibold text-gray-900 hover:bg-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={() => setIsViewResult(true)}>
          Submit
        </button>
      )}
    </div>
  );
}
