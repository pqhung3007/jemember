"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Question from "components/lesson/test/Question";
import ToggleMarked from "components/lesson/test/ToggleMarked";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "type";

import { compareString, pickRandom, replaceAt } from "utils";

export default function TestPage({
  cards,
  marked,
}: {
  cards: Card[];
  marked: Card[];
}) {
  const [isMarkedOnly, setIsMarkedOnly] = useState(false);
  const lengthRef = useRef<HTMLInputElement>(null);
  const [testCards, setTestCards] = useState([] as Card[]);
  const [isViewResult, setIsViewResult] = useState(false);

  const [answers, setAnswers] = useState(new Array(5).fill(""));

  const updateAnswer = (newValue: string, index: number) => {
    setAnswers(replaceAt(answers, index, newValue));
  };

  const resetTest = (length: number) => {
    setIsViewResult(false);
    setTestCards(pickRandom(isMarkedOnly ? marked : cards, length));
    setAnswers(new Array(length).fill(""));
  };

  useEffect(
    () => resetTest(parseInt(lengthRef.current?.value || "5")),
    [isMarkedOnly]
  );

  const newTestLength = () => {
    const newLength = parseInt(lengthRef.current?.value || "5");
    resetTest(newLength);
  };

  const grading = useCallback(() => {
    let count = 0;
    for (let i = 0; i < answers.length; i++) {
      if (compareString(answers[i], testCards[i].answer)) {
        count++;
      }
    }
    return count;
  }, [isViewResult]);

  return (
    <div className="mx-auto flex max-w-[80ch] flex-col gap-5 pb-20">
      <Link className="flex items-center gap-4" href="./">
        <ArrowLeftIcon className="h-6 w-6 " />
        Back
      </Link>
      <div className="items-center justify-between gap-4 md:flex">
        <div className="flex gap-3 rounded-full bg-neutral-700 px-4 py-2 font-medium">
          <p className="pointer-events-none text-neutral-400">Test length</p>
          <input
            className="w-[5rem] bg-neutral-700 text-neutral-300 focus:outline-none"
            type="number"
            min={1}
            max={isMarkedOnly ? marked.length : cards.length}
            defaultValue={5}
            ref={lengthRef}
          />
        </div>
        {marked.length > 0 && <ToggleMarked toggleMarked={setIsMarkedOnly} />}
        <button
          className="rounded-full bg-green-800 px-8 py-2 font-semibold text-green-200 hover:bg-green-700"
          onClick={newTestLength}>
          Create new test
        </button>
      </div>
      {isViewResult && (
        <div
          className={`rounded-xl ${
            grading() * 2 > testCards.length
              ? "bg-green-700 text-green-200"
              : "bg-red-700 text-red-200"
          } p-6 text-center text-2xl font-semibold`}>
          Grade: {grading() + "/" + testCards.length}
        </div>
      )}
      {testCards.map((ques, index) => (
        <Question
          key={index}
          ques={ques}
          index={index}
          actual={answers[index]}
          isViewResult={isViewResult}
          updateAnswer={updateAnswer}
        />
      ))}
      <button
        className="rounded-full bg-green-800 py-3 font-semibold text-green-200 hover:bg-green-700"
        onClick={() => setIsViewResult(true)}>
        Submit
      </button>
    </div>
  );
}
