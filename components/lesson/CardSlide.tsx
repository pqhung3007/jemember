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
  toggleMarked: (card_id: string) => void;
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
      <div className="">
        <div className="group mx-auto flex max-w-[950px] items-center gap-4 py-6">
          <div className="pl-8 text-5xl font-semibold">{lesson.name}</div>
        </div>
        <div className="mx-auto max-w-[950px] pt-6">
          <div className="mb-6 h-2 w-full rounded-full bg-neutral-700">
            <div
              className="h-2 rounded-full bg-green-700"
              style={{ width: percent }}
            ></div>
          </div>
        </div>
        <div
          className="mx-auto flex items-center justify-center gap-[min(2vw,10px)] focus:outline-none"
          tabIndex={0}
          ref={containerRef}
          onKeyDown={processKeyBinding}
        >
          <PrevCard isDisabled={index <= 0} prev={prev} />
          <CardComp
            isFront={isFront}
            setIsFront={setIsFront}
            card={cards[index] || undefined}
            isMarked={marked.includes(cards[index]?.id) || false}
            progress={index + 1 + " / " + cards?.length}
            toggleMarked={toggleMarked}
          />
          <NextCard isDisabled={index >= cards.length - 1} next={next} />
        </div>
      </div>
      <div className="mx-auto max-w-[950px]">
        <div className="flex items-center justify-between py-10 md:px-4">
          <div className="">
            <p>Created by</p>
            <p>FU-JS</p>
          </div>
          <div className="flex gap-4">
            <LearnButton id={lesson.id} />
            <EditButton id={lesson.id} />
            <TestButton id={lesson.id} />
            <CopyButton copy={copy} />
          </div>
        </div>
      </div>
    </>
  );
}
