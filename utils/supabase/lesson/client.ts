import { supabaseBrowserClient as supabase } from "../browser";
import { Card } from "type";
import { supabaseGetCurrentUID } from "../auth/client";

export const updateCardToDatabase = async (newData: Card) => {
  await supabase.from("card").upsert({
    id: newData.id,
    question: newData.question,
    answer: newData.answer,
    lesson_id: newData.lesson_id,
  });
};

export const supabaseInsertMark = async (cardId: string) => {
  const uid = await supabaseGetCurrentUID();

  if (!uid) {
    return;
  }

  await supabase.from("users_mark_cards").insert({
    uid: uid,
    card_id: cardId,
  });
};

export const supabaseLearnCard = async (cardId: string) => {
  const uid = await supabaseGetCurrentUID();

  if (!uid) {
    return;
  }

  await supabase.from("users_learn_cards").insert({
    uid: uid,
    card_id: cardId,
  });
};

export const supabaseDeleteMarkByCardId = async (cardId: string) => {
  const uid = await supabaseGetCurrentUID();

  await supabase
    .from("users_mark_cards")
    .delete()
    .eq("card_id", cardId)
    .eq("uid", uid);
};

export const supabaseDeleteLearnByCardId = async (cardId: string) => {
  const uid = await supabaseGetCurrentUID();

  await supabase
    .from("users_learn_cards")
    .delete()
    .eq("card_id", cardId)
    .eq("uid", uid);
};

export const supabaseDeleteCardById = async (cardId: string) => {
  await supabaseDeleteMarkByCardId(cardId);
  await supabaseDeleteLearnByCardId(cardId);
  await supabase.from("card").delete().eq("id", cardId);
};

export const supabaseInsertLesson = async (name: string) => {
  await supabase.from("lesson").insert({ name: name });
};

export const supabaseInsertNewCardInLesson = async (lesson_id: string) => {
  const newCard = {
    question: "",
    answer: "",
    lesson_id: lesson_id,
  };

  return await supabase.from("card").insert(newCard).select();
};

export const supabaseImportCard = async (
  content: string,
  lesson_id: string,
  isReversed: boolean,
  lineSep: string,
  cardSep: string
) => {
  const lines = content.split(lineSep);

  const cardSet = lines.map((line) => {
    let question, answer;
    if (isReversed) {
      [question, answer] = line.split(cardSep);
    } else {
      [answer, question] = line.split(cardSep);
    }
    return {
      question: question || "",
      answer: answer || "",
      lesson_id: lesson_id,
    };
  });

  return await supabase.from("card").insert(cardSet).select();
};

export const supabaseUpdateLessonById = async (
  newName: string,
  lesson_id: string
) => {
  await supabase
    .from("lesson")
    .update({ name: newName })
    .match({ id: lesson_id });
};
