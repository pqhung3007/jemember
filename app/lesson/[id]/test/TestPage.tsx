"use client";

import { ArrowLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import Question from "components/lesson/test/Question";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Card } from "type";

import { replaceAt } from "utils";
import QuestionButton from "./QuestionButton";

export default function TestPage({ cards }: { cards: Card[] }) {
  const [startTime, _] = useState(new Date());
  const testTimeInSeconds = 60 * 60;
  const [answers, setAnswers] = useState(new Array(cards.length).fill(""));
  const [marked, setMarked] = useState(new Array(cards.length).fill(false));

  const [remainingTime, setRemainingTime] = useState(testTimeInSeconds);
  const [isDone, setIsDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const updateAnswer = (newValue: string, index: number) => {
    setAnswers(replaceAt(answers, index, newValue));
  };

  const updateMarked = (newValue: boolean, index: number) => {
    setMarked(replaceAt(marked, index, newValue));
  };

  setInterval(() => {
    const now = new Date();
    const elapsedTime = (now.getTime() - startTime.getTime()) / 1000;
    setRemainingTime(testTimeInSeconds - elapsedTime);
    if (elapsedTime > testTimeInSeconds) {
      setIsDone(true);
    }
  }, 1000);

  const grading = useCallback(() => {
    let count = 0;
    for (let i = 0; i < answers.length; i++) {
      if (isAnswerCorrect(answers[i], cards[i].answer)) {
        count++;
      }
    }
    return count;
  }, [isDone]);

  const isAnswerCorrect = (actual: string, expected: string) => {
    return actual.toLowerCase() === expected.toLowerCase();
  };

  const nextQuestion = () => {
    if (currentQuestion < cards.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleMarkThisQuestion = () => {
    updateMarked(!marked[currentQuestion], currentQuestion);
  };

  return (
    <div className="mx-auto flex flex-col gap-5 pb-20">
      <Link className="flex items-center gap-4" href=".">
        <ArrowLeftIcon className="h-6 w-6 " />
        Back
      </Link>
      {isDone && (
        <div
          className={`rounded-xl ${
            grading() * 2 > cards.length
              ? "bg-green-400 text-green-900 dark:bg-green-700 dark:text-green-200"
              : "bg-red-400 text-red-900 dark:bg-red-700 dark:text-red-200"
          } p-6 text-center text-2xl font-semibold`}>
          Grade: {grading() + "/" + cards.length}
        </div>
      )}
      <div className="gap-2 md:flex">
        <div className="flex h-full grow-[4] flex-col justify-between self-stretch">
          <Question
            key={currentQuestion}
            ques={cards[currentQuestion]}
            index={currentQuestion}
            actual={answers[currentQuestion]}
            isViewResult={isDone}
            updateAnswer={updateAnswer}
          />
          <div className="flex justify-between gap-3 py-4">
            <button
              className="rounded-lg bg-gray-300 px-5 py-2 font-semibold text-gray-900 hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              disabled={currentQuestion === 0}
              onClick={prevQuestion}>
              Previous
            </button>
            <div className="">
              <button
                className="mr-4 rounded-lg font-semibold text-gray-900 disabled:cursor-not-allowed dark:text-gray-200"
                onClick={toggleMarkThisQuestion}>
                {marked[currentQuestion] ? (
                  <SolidBookmarkIcon className="inline h-6 w-6 text-yellow-500" />
                ) : (
                  <BookmarkIcon className="inline h-6 w-6" />
                )}
              </button>
              <button
                className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-800 dark:hover:bg-indigo-700"
                disabled={currentQuestion === cards.length - 1}
                onClick={nextQuestion}>
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid max-h-[50vmin] w-full grid-cols-10 gap-1 overflow-y-scroll md:w-[40ch] md:grid-cols-9">
            {cards.map((_, index) => (
              <QuestionButton
                isAnswered={answers[index] !== ""}
                index={index}
                setCurrentQuestion={setCurrentQuestion}
                isMarked={marked[index]}
              />
            ))}
          </div>
          {!isDone && (
            <>
              <button
                className="my-3 w-full rounded-xl bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700"
                onClick={() => setIsDone(true)}>
                Submit
              </button>
              <div className="">
                {"Remaining time: "}
                <span className="font-bold">
                  {Math.floor(remainingTime / 60)}:
                  {Math.floor(remainingTime % 60)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
