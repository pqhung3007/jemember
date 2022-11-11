"use client";

import { useEffect, useRef, useState } from "react";

import LocalSearch from "../search/LocalSearch";
import CopyButton from "./CopyButton";
import Flashcard from "./Flashcard";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { includeString } from "../../utils";
import CardDetails from "./CardDetails";
import EditButton from "./EditButton";

interface LessonProps {
  id: string;
  title: string;
  cards: any[];
}

const setButtonState = (isDisabled: boolean): string => {
  return isDisabled
    ? "bg-neutral-700 cursor-not-allowed"
    : "bg-green-700 cursor-pointer";
};

export default function LessonContent({ id, title, cards }: LessonProps) {
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);
  const [cardsSearch, setCardsSearch] = useState([] as any[]);
  const [keyWord, setKeyWord] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const processKeyBinding = (event: any) => {
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

  useEffect(() => {
    if (keyWord.trim() !== "") {
      let newResult = cards.filter(
        (card) =>
          includeString(card.question, keyWord) ||
          includeString(card.answer, keyWord)
      );
      setCardsSearch(newResult);
    } else {
      setCardsSearch(cards);
    }
  }, [cards, keyWord]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  let prevButtonStyle = setButtonState(index <= 0);
  let nextButtonStyle = setButtonState(index >= cards.length - 1);

  let percent = ((index + 1) * 100) / cards.length + "%";

  return (
    <>
      <div
        className="focus:outline-none"
        tabIndex={0}
        ref={containerRef}
        onKeyDown={processKeyBinding}
      >
        <div className="mx-auto flex max-w-[800px] items-center gap-4 py-6">
          <a href="/">
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </a>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="mx-auto max-w-[800px] pt-6">
          <div className="mb-6 h-0.5 w-full rounded-full bg-neutral-700">
            <div
              className="h-0.5 rounded-full bg-white"
              style={{ width: percent }}
            ></div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-[min(2vw,10px)]">
          <PrevCard prevButtonStyle={prevButtonStyle} prev={prev} />
          <Flashcard
            isFront={isFront}
            setIsFront={setIsFront}
            info={cards[index]}
            index={index}
            size={cards?.length}
          />
          <NextCard nextButtonStyle={nextButtonStyle} next={next} />
        </div>
      </div>

      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center justify-between py-5">
          <div className="">
            <p>Created by</p>
            <p>FU-JS</p>
          </div>
          <div className="flex">
            <EditButton id={id} />
            <CopyButton copy={copy} />
          </div>
        </div>
        <div className="space-y-3">
          <LocalSearch setKeyWord={setKeyWord} />
          <CardDetails cards={cardsSearch} />
        </div>
      </div>
    </>
  );
}
