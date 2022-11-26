import { KeyboardEvent, useMemo, useRef, useState } from "react";
import { Card } from "type";

export default function CurrentCard({
  card,
  process,
}: {
  card: Card;
  process: (card_id: string, isCorrect: boolean) => Promise<void>;
}) {
  const [isDone, setIsDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const checkAnswer = async () => {
    setIsDone(true);
    const isCorrect =
      inputRef.current?.value.toLowerCase() === card.answer.toLowerCase();
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setIsDone(false);
      process(card.id, isCorrect);
    }, 1000);
  };

  return (
    <div className="flex w-[90vw] flex-col justify-between rounded-3xl bg-neutral-700 p-5 md:w-[70vw]">
      <p className="whitespace-pre-wrap pb-8 text-xl">{card.question}</p>
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          ref={inputRef}
          disabled={isDone}
          onKeyDown={processKeyBinding}
          className="w-full rounded-full bg-neutral-800 py-2 px-4 uppercase focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          className="w-full rounded-full bg-green-700 px-8 py-3 md:w-auto"
          onClick={checkAnswer}
        >
          Submit
        </button>
      </div>
      {isDone ? (
        <p className={`mt-4 rounded-xl border-2 p-2 ${setBorder}`}>
          Correct answer: {card.answer}
        </p>
      ) : (
        <div className="h-12"></div>
      )}
    </div>
  );
}
