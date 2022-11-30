import { useEffect, useRef, useState, KeyboardEvent } from "react";
import type { Card, LessonBase } from "type";
import CardComp from "./Card";
import CopyButton from "./CopyButton";
import EditButton from "./EditButton";
import LearnButton from "./LearnButton";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";
import TestButton from "./TestButton";

export default function CardSlide({
  lesson,
  cards,
  marked,
  toggleMarked,
}: {
  lesson: LessonBase;
  cards: Card[];
  marked: string[];
  toggleMarked: (cardId: string) => void;
}) {
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const processKeyBinding = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === " " ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();
      setIsFront(!isFront);
    } else if (event.key === "ArrowLeft") {
      prev();
    } else if (event.key === "ArrowRight") {
      next();
    }
  };

  const prev = () => {
    if (index > 0) {
      setIsFront(true);
      setIndex(index - 1);
    }
  };

  const next = () => {
    if (index < cards.length - 1) {
      setIsFront(true);
      setIndex(index + 1);
    }
  };

  const copy = () => {
    if (isFront) {
      navigator.clipboard.writeText(cards[index] ? cards[index].question : "");
    } else {
      navigator.clipboard.writeText(cards[index] ? cards[index].answer : "");
    }
  };

  const percent = ((index + 1) * 100) / cards.length + "%";

  return (
    <>
      <div className="mx-auto flex max-w-[800px] flex-col gap-8">
        <h1 className="text-center text-5xl font-semibold md:text-left">
          {lesson.name}
        </h1>
        <div className="h-0.5 w-full rounded-full bg-neutral-700">
          <div
            className="h-0.5 rounded-full bg-green-700"
            style={{ width: percent }}></div>
        </div>
        <div
          tabIndex={0}
          ref={containerRef}
          className="focus:outline-none"
          onKeyDown={processKeyBinding}>
          <div className="mx-auto flex flex-col items-center">
            <CardComp
              isFront={isFront}
              setIsFront={setIsFront}
              card={cards[index] || undefined}
              isMarked={marked.includes(cards[index]?.id) || false}
              progress={index + 1 + " / " + cards?.length}
              toggleMarked={toggleMarked}
            />
          </div>
          <div className="flex justify-center gap-3 pt-8">
            <PrevCard isDisabled={index <= 0} prev={prev} />
            <NextCard isDisabled={index >= cards.length - 1} next={next} />
          </div>
        </div>
        <div className="grid max-w-[800px] gap-4 px-6 pb-8 md:mx-auto md:flex md:justify-center">
          <LearnButton id={lesson.id} />
          <EditButton id={lesson.id} />
          <TestButton id={lesson.id} />
          <CopyButton copy={copy} />
        </div>
      </div>
    </>
  );
}
