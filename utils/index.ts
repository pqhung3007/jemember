import { supabase } from "supabase";

export const includeString = (first: string, second: string) => {
  return first.toLowerCase().includes(second.toLowerCase());
};

export const fetchLessonById = async (id: string) => {
  const { data, error } = await supabase.from("lesson").select().eq("id", id);
  if (!error) {
    return data[0];
  }
};

export const fetchCardsByLessonId = async (lessonId: string) => {
  const { data, error } = await supabase
    .from("card")
    .select()
    .eq("lesson_id", lessonId);
  if (!error) {
    return data;
  }
  return [];
};

export const fetchCurrentUID = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session?.user.id || "";
};

export const fetchMarkedCardsId = async (uid: string, lesson_id: string) => {
  if (!uid) return [];
  const { data, error } = await supabase
    .from("users_mark_cards")
    .select("card_id, card (lesson_id)")
    .eq("card.lesson_id", lesson_id)
    .eq("uid", uid);
  if (!error) return data.map((card) => card.card_id);
  return [];
};

export const fetchAllLessons = async () => {
  const { data, error } = await supabase.from("lesson").select();

  if (error) throw new Error("An error occured while fetching lessons");

  return data;
};

export const getMultipleRandom = (arr: any[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

export const replaceAt = (array: any[], index: number, value: any) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};
