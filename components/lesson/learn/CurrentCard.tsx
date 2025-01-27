import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarredIcon } from "@heroicons/react/24/solid";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "type";

export default function CurrentCard({
  card,
  process,
  isMarked,
  toggleMarked,
}: {
  card: Card;
  process: (cardId: string, isCorrect: boolean) => Promise<void>;
  isMarked: boolean;
  toggleMarked: (cardId: string) => void;
}) {
  const [isDone, setIsDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isDone]);

  const setBorder = useMemo(() => {
    if (isDone) {
      if (inputRef.current?.value.toLowerCase() === card.answer.toLowerCase()) {
        return "border-green-600";
      } else {
        return "border-red-600";
      }
    }
    return "";
  }, [isDone]);

  const processKeyBinding = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkAnswer();
    }
  };

  const toggleMarkedThisCard = () => {
    toggleMarked(card.id);
  };

  const checkAnswer = async () => {
    setIsDone(true);
    const isCorrect =
      inputRef.current?.value.toLowerCase() === card.answer.toLowerCase();
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      if (!isCorrect && !isMarked) {
        toggleMarkedThisCard();
      }
      setIsDone(false);
      process(card.id, isCorrect);
    }, 1000);
  };

  const chooseAnswer = (answer: string) => {
    if (inputRef.current) {
      inputRef.current.value = answer;
      checkAnswer();
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-gray-300 bg-gray-50 p-5 dark:border-gray-600 dark:bg-gray-800 max-sm:mt-12 xl:w-[90ch]">
      <div className="flex justify-end">
        {isMarked ? (
          <StarredIcon
            className="h-6 w-6 text-yellow-500 dark:text-yellow-400"
            onClick={toggleMarkedThisCard}
          />
        ) : (
          <StarIcon
            className="h-6 w-6 dark:text-white"
            onClick={toggleMarkedThisCard}
          />
        )}
      </div>
      <p className="whitespace-pre-wrap pb-8 text-xl">{card.question}</p>
      <p className="text-md whitespace-pre-wrap pb-8 text-gray-400">
        Answer length: {card.answer?.length}
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          ref={inputRef}
          disabled={isDone}
          onKeyDown={processKeyBinding}
          className="w-full rounded-xl border border-gray-300 bg-gray-200 px-4 py-2 uppercase focus:outline-none disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700"
        />
        <button
          className="w-full rounded-xl bg-green-400 px-8 py-3 dark:bg-green-700 md:w-auto"
          onClick={checkAnswer}>
          Submit
        </button>
      </div>
      <div className="grid gap-4 py-3 text-white md:grid-cols-4">
        <button
          className="rounded-xl bg-indigo-700 py-3 dark:bg-indigo-800"
          onClick={() => chooseAnswer("A")}>
          A
        </button>
        <button
          className="rounded-xl bg-indigo-700 py-3 dark:bg-indigo-800"
          onClick={() => chooseAnswer("B")}>
          B
        </button>
        <button
          className="rounded-xl bg-indigo-700 py-3 dark:bg-indigo-800"
          onClick={() => chooseAnswer("C")}>
          C
        </button>
        <button
          className="rounded-xl bg-indigo-700 py-3 dark:bg-indigo-800"
          onClick={() => chooseAnswer("D")}>
          D
        </button>
      </div>
      {isDone ? (
        <p className={`mt-4 rounded-xl border-2 p-2 ${setBorder}`}>
          Correct answer: {card.answer}
        </p>
      ) : (
        <div className="h-[3.5rem]"></div>
      )}
    </div>
  );
}
