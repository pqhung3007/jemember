"use client";

import { useEffect, useState } from "react";

import { Card as CardData } from "components/lesson/Card";

import CardDetails from "components/lesson/CardDetails";
import CardSlide from "components/lesson/CardSlide";
import { supabase } from "supabase";
import { fetchCurrentUID, fetchMarkedCardsId } from "utils";

export interface LessonProps {
  lesson: any;
  cards: CardData[];
}

export default function LessonPage({ lesson, cards }: LessonProps) {
  const [uid, setUid] = useState("");

  const [marked, setMarked] = useState([] as string[]);

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
    fetchCurrentUID().then((uid) => {
      setUid(uid);
      fetchMarkedCardsId(uid, lesson.id).then((markedCards) =>
        setMarked(markedCards)
      );
    });
  }, []);

  return (
    <>
      <CardSlide
        lesson={lesson}
        cards={cards}
        marked={marked}
        toggleMarked={toggleMarked}
      />

      <CardDetails
        markedIds={marked}
        cards={cards}
        toggleMarked={toggleMarked}
      />
    </>
  );
}
