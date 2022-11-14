"use client";

import { useEffect, useRef, useState } from "react";

import LocalSearch from "components/search/LocalSearch";
import CopyButton from "components/lesson/CopyButton";
import Card, { Card as CardData } from "components/lesson/Card";
import NextCard from "components/lesson/NextCard";
import PrevCard from "components/lesson/PrevCard";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { includeString, setButtonState } from "utils";
import CardDetails from "components/lesson/CardDetails";
import EditButton from "components/lesson/EditButton";
import { supabase } from "supabase";

interface LessonProps {
  lessonId: string;
  title: string;
  cards: CardData[];
}

const fetchCurrentUID = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session?.user.id || "";
};

const fetchMarkedCardsId = async (uid: string, lesson_id: string) => {
  if (!uid) return [];
  const { data, error } = await supabase
    .from("users_mark_cards")
    .select("card_id, card (lesson_id)")
    .eq("card.lesson_id", lesson_id)
    .eq("uid", uid);
  if (!error) return data.map((card) => card.card_id);
  return [];
};

export default function LessonPage({ lessonId, title, cards }: LessonProps) {
  const [uid, setUid] = useState("");
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);
  const [cardsSearch, setCardsSearch] = useState([] as any[]);
  const [keyWord, setKeyWord] = useState("");
  const [marked, setMarked] = useState([] as string[]);

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

  const toggleMarked = async (card_id: string) => {
    let uid = await fetchCurrentUID();
    if (!marked.includes(card_id)) {
      setMarked([...marked, card_id]);
      await supabase.from("users_mark_cards").insert({
        uid: uid,
        card_id: card_id,
      });
    } else {
      setMarked(marked.filter((id) => id !== card_id));
      await supabase.from("users_mark_cards").delete().eq("card_id", card_id);
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
    fetchCurrentUID().then((uid) => {
      setUid(uid);
      fetchMarkedCardsId(uid, lessonId).then((markedCards) =>
        setMarked(markedCards)
      );
    });
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
          <div className="mb-6 h-0.5 w-full rounded-full bg-gray-700">
            <div
              className="h-0.5 rounded-full bg-white"
              style={{ width: percent }}
            ></div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-[min(2vw,10px)]">
          <PrevCard prevButtonStyle={prevButtonStyle} prev={prev} />
          {cards[index] && (
            <Card
              isFront={isFront}
              setIsFront={setIsFront}
              card={cards[index]}
              index={index}
              isMarked={marked.includes(cards[index].id)}
              size={cards?.length}
              toggleMarked={toggleMarked}
            />
          )}
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
            <EditButton id={lessonId} />
            <CopyButton copy={copy} />
          </div>
        </div>
        <div className="sticky top-0 py-4">
          <LocalSearch setKeyWord={setKeyWord} />
        </div>
        <div className="space-y-3">
          <CardDetails
            markedIds={marked}
            cards={cardsSearch}
            toggleMarked={toggleMarked}
          />
        </div>
      </div>
    </>
  );
}
