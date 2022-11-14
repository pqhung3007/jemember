"use client";

import { useEffect, useState } from "react";
import { getMultipleRandom, replaceAt } from "utils";

export default function TestPage({ lesson, cards }: any) {

  const [testCards, setTestCards] = useState([] as any[]);

  const [isViewResult, setIsViewResult] = useState(false);

  const [answer, setAnswer] = useState(new Array(10).fill("") as string[]);

  const setInputBorder = (actual: string, expected: string) => {
    if (isViewResult) {
      if (actual.toUpperCase() === expected.toUpperCase()) {
        return "border-green-600";
      } else {
        return "border-red-600";
      }
    }
    return "border-gray-600"
  }

  useEffect(() => {
    setTestCards(getMultipleRandom(cards, 10));
  }, [])

  return (
    <div className="max-w-[75ch] mx-auto flex flex-col gap-5 pb-20">
      {testCards.map((ques, index) =>
        <div className="bg-gray-800 border border-gray-600 p-5 rounded-lg" key={ques.id}>
          <p className="whitespace-pre-wrap">
            {ques.question}
          </p>
          <div className="">
            <input type="text"
              placeholder="Answer"
              className={`bg-gray-900 border ${setInputBorder(answer[index], ques.answer)} w-full focus:outline-none px-4 py-2 my-6 rounded`}
              defaultValue={answer[index]}
              onChange={(e) => setAnswer(replaceAt(answer, index, e.target.value))}
              disabled={isViewResult}
            />
          </div>
          {
            isViewResult &&
            <p className="whitespace-pre-wrap">
              Actual answer: {ques.answer}
            </p>
          }
        </div>)
      }
      <button
        className="bg-green-700 hover:bg-green-600 py-2 rounded-lg font-semibold"
        onClick={() => setIsViewResult(true)}
      >
        Submit
      </button>
    </div>
  );
}
