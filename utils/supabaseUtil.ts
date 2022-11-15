import { Card as CardData } from "components/lesson/Card";
import { supabase } from "supabase";

export const supabaseGetLessonById = async (id: string) => {
  const { data, error } = await supabase.from("lesson").select().eq("id", id);
  if (!error) {
    return data[0];
  }
};

export const supabaseGetCardsByLessonId = async (lessonId: string) => {
  const { data, error } = await supabase
    .from("card")
    .select()
    .eq("lesson_id", lessonId);
  if (!error) {
    return data;
  }
  return [];
};

export const supabaseGetCurrentUID = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session?.user.id || "";
};

export const supabaseGetCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session?.user;
};

export const supabaseGetMarkedCardsIdByLessonId = async (lesson_id: string) => {
  let uid = await supabaseGetCurrentUID();
  const { data, error } = await supabase
    .from("users_mark_cards")
    .select("card_id, card (lesson_id)")
    .eq("card.lesson_id", lesson_id)
    .eq("uid", uid);
  if (!error) return data.map((card) => card.card_id);
  return [];
};

export const supabaseGetAllLessons = async () => {
  const { data, error } = await supabase.from("lesson").select();

  if (error) throw new Error("An error occured while fetching lessons");

  return data;
};

export const supabaseSignin = async (email: string, pass: string) => {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });
};

export const supabaseSignup = async (email: string, pass: string) => {
  return await supabase.auth.signUp({
    email: email,
    password: pass,
  });
};

export const updateCardToDatabase = async (newData: CardData) => {
  await supabase.from("card").upsert({
    id: newData.id,
    question: newData.question,
    answer: newData.answer,
    lesson_id: newData.lesson_id,
  });
};

export const supabaseInsertMark = async (card_id: string) => {
  let uid = await supabaseGetCurrentUID();

  await supabase.from("users_mark_cards").insert({
    uid: uid,
    card_id: card_id,
  });
};

export const supabaseDeleteMarkByCardId = async (card_id: string) => {
  let uid = await supabaseGetCurrentUID();

  await supabase
    .from("users_mark_cards")
    .delete()
    .eq("card_id", card_id)
    .eq("uid", uid);
};

export const supabaseDeleteCardById = async (id: string) => {
  await supabase.from("card").delete().eq("id", id);
};

export const supabaseInsertLesson = async (name: string) => {
  await supabase.from("lesson").insert({ name: name });
};

export const supabaseSignOut = async () => {
  return await supabase.auth.signOut();
};

export const supabaseCountLesson = async () => {
  const { data, error, count } = await supabase
    .from("lesson")
    .select("*", { count: "exact", head: true });
  return count || 0;
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
  lesson_id: string
) => {
  let lines = content.split(";;;;;;");
  return await supabase
    .from("card")
    .insert(
      lines.map((line) => {
        const [question, answer] = line.split("&&&&&&");
        return {
          question: question || "",
          answer: answer || "",
          lesson_id: lesson_id,
        };
      })
    )
    .select();
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
