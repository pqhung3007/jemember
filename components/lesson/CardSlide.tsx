import { Card as CardData } from "components/lesson/Card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabaseUpdateLessonById } from "utils";
import Card from "./Card";
import CopyButton from "./CopyButton";
import EditButton from "./EditButton";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";

interface LessonProps {
  lesson: any;
  cards: CardData[];
  marked: string[];
  toggleMarked: (card_id: string) => void;
}

export default function CardSlide({
  lesson,
  cards,
  marked,
  toggleMarked,
}: LessonProps) {
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState(lesson.name);
  const containerRef = useRef<HTMLDivElement>(null);
  const lessonNameInputRef = useRef<HTMLInputElement>(null);
  let typingTimer: NodeJS.Timeout;

  const updateTitle = async () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
      if (lessonNameInputRef.current?.value) {
        let newName = lessonNameInputRef.current.value;
        setTitle(newName);
        await supabaseUpdateLessonById(newName, lesson.id);
      }
    }, 500);
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

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

  let percent = ((index + 1) * 100) / cards.length + "%";

  return (
    <>
      <div className="">
        <div className="mx-auto flex max-w-[800px] items-center gap-4 py-6">
          <Link href="/">
            <i className="fa-solid fa-chevron-left fa-lg cursor-pointer text-white"></i>
          </Link>
          <input
            className="inline max-w-[60vw] grow bg-transparent text-3xl font-semibold focus:outline-none"
            defaultValue={title}
            ref={lessonNameInputRef}
            onKeyDown={() => clearTimeout(typingTimer)}
            onKeyUp={updateTitle}
          />
          <div className="">
            <i
              className="fa-solid fa-pencil cursor-pointer text-gray-400"
              onClick={() => lessonNameInputRef.current?.focus()}
            ></i>
          </div>
        </div>
        <div className="mx-auto max-w-[800px] pt-6">
          <div className="mb-6 h-0.5 w-full rounded-full bg-gray-700">
            <div
              className="h-0.5 rounded-full bg-green-600"
              style={{ width: percent }}
            ></div>
          </div>
        </div>
        <div
          className="mx-auto flex max-w-[1500px] items-center justify-center gap-[min(2vw,10px)] focus:outline-none"
          tabIndex={0}
          ref={containerRef}
          onKeyDown={processKeyBinding}
        >
          <PrevCard isDisabled={index <= 0} prev={prev} />
          {cards[index] && (
            <Card
              isFront={isFront}
              setIsFront={setIsFront}
              card={cards[index]}
              isMarked={marked.includes(cards[index].id)}
              progress={index + 1 + " / " + cards?.length}
              toggleMarked={toggleMarked}
            />
          )}
          <NextCard isDisabled={index >= cards.length - 1} next={next} />
        </div>
      </div>
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center justify-between py-5">
          <div className="">
            <p>Created by</p>
            <p>FU-JS</p>
          </div>
          <div className="flex gap-4">
            <EditButton id={lesson.id} />
            <Link
              href={`/lesson/${lesson.id}/test`}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white ring-1 ring-gray-600 hover:bg-gray-700/80 hover:ring-gray-500 focus:outline-none"
            >
              <p>Test this lesson</p>
            </Link>
            <CopyButton copy={copy} />
          </div>
        </div>
      </div>
    </>
  );
}
