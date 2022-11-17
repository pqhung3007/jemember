"use client";

import Question from "components/lesson/test/Question";
import ToggleMarked from "components/lesson/test/ToggleMarked";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardProps } from "types";
import {
  compareString,
  getMultipleRandom,
  replaceAt,
  supabaseGetCurrentUID,
  supabaseGetMarkedCardsIdByLessonId,
} from "utils";

export default function TestPage({
  cards,
  id,
}: {
  cards: CardProps[];
  id: string;
}) {
  const [isMarkedOnly, setIsMarkedOnly] = useState(false);
  const [uid, setUid] = useState("");
  const [length, setLength] = useState(5);
  const lengthInputRef = useRef<HTMLInputElement>(null);
  const [testCards, setTestCards] = useState([] as CardProps[]);
  const [isViewResult, setIsViewResult] = useState(false);
  const [marked, setMarked] = useState([] as CardProps[]);

  useEffect(() => {
    supabaseGetCurrentUID().then((sessionUid) => setUid(sessionUid));
    supabaseGetMarkedCardsIdByLessonId(id).then((markedIds) =>
      setMarked(cards.filter((card) => markedIds.includes(card.id)))
    );
  }, []);

  const [answers, setAnswers] = useState(
    new Array(length).fill("") as string[]
  );

  const updateAnswer = (newValue: string, index: number) => {
    setAnswers(replaceAt(answers, index, newValue));
  };

  const resetTest = () => {
    setIsViewResult(false);
    if (isMarkedOnly) {
      setTestCards(getMultipleRandom(marked, length));
    } else {
      setTestCards(getMultipleRandom(cards, length));
    }
    setAnswers(new Array(length).fill(""));
  };

  useEffect(resetTest, [length, isMarkedOnly]);

  const newTestLength = () => {
    let newLength = parseInt(lengthInputRef.current?.value || "5");
    if (length === newLength) {
      resetTest();
    } else {
      setLength(newLength);
    }
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
    <div className="mx-auto flex max-w-[75ch] flex-col gap-5 pb-20">
      <div className="items-center justify-between gap-4 md:flex">
        <div className="flex gap-3 rounded-lg bg-gray-700 px-4 py-2 font-medium">
          <p className="pointer-events-none text-gray-400">Test length</p>
          <input
            className="w-[5rem] bg-gray-700 focus:outline-none"
            type="number"
            min={1}
            max={isMarkedOnly ? marked.length : cards.length}
            defaultValue={length}
            ref={lengthInputRef}
          />
        </div>
        {uid && <ToggleMarked setIsMarkedOnly={setIsMarkedOnly} />}
        <button
          className="rounded-xl bg-green-700 px-8 py-2 font-semibold hover:bg-green-600"
          onClick={newTestLength}
        >
          Create new test
        </button>
      </div>
      {isViewResult && (
        <div
          className={`rounded-xl bg-${
            grading() * 2 > testCards.length ? "green" : "red"
          }-700 p-6 text-center text-2xl font-semibold`}
        >
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
        className="rounded-lg bg-green-700 py-2 font-semibold hover:bg-green-600"
        onClick={() => setIsViewResult(true)}
      >
        Submit
      </button>
    </div>
  );
}
