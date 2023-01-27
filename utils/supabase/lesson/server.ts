import "server-only";

import { supabaseServerClient } from "../server";
import type { Card, LessonBase } from "type";
import { useCurrentUserSession } from "../auth/server";

export async function useLessonById(id: string): Promise<LessonBase> {
  const { data, error } = await supabaseServerClient()
    .from("lesson")
    .select()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data[0];
}

export const useCardsByLessonId = async (lessonId: string): Promise<Card[]> => {
  const { data, error } = await supabaseServerClient()
    .from("card")
    .select()
    .eq("lesson_id", lessonId);

  if (!error) {
    return data;
  }

  return [];
};

export const useMarkedCardsIdByLessonId = async (
  lessonId: string
): Promise<string[]> => {
  const uid = (await useCurrentUserSession())?.user?.id;

  if (!uid) {
    return [];
  }

  const { data, error } = await supabaseServerClient().rpc("marked_cards", {
    _uid: uid,
    _lesson_id: lessonId,
  });

  if (error) throw new Error(error.message);

  return (data as unknown as { id: string }[]).map((row) => row.id);
};

export const useLearnedCardsIdByLessonId = async (
  lessonId: string
): Promise<string[]> => {
  const uid = (await useCurrentUserSession())?.user?.id;

  if (!uid) {
    return [];
  }

  const { data, error } = await supabaseServerClient().rpc("learned_cards", {
    _uid: uid,
    _lesson_id: lessonId,
  });

  if (error) throw new Error(error.message);

  return (data as unknown as { id: string }[]).map((row) => row.id);
};

export const useAllLessons = async () => {
  const { data, error } = await supabaseServerClient().from("lesson").select();

  if (error) throw new Error(error.message);

  return data;
};

export const useLessonsByName = async (name: string) => {
  if (!name) {
    const { data, error } = await supabaseServerClient()
      .from("lesson")
      .select();
    if (error) throw new Error(error.message);
    return data;
  } else {
    const { data, error } = await supabaseServerClient()
      .from("lesson")
      .select()
      .ilike("name", `%${name}%`);
    if (error) throw new Error(error.message);
    return data;
  }
};

export const isEditable = async (lessonId: string): Promise<boolean> => {

  const uid = (await useCurrentUserSession())?.user?.id;

  if (!uid) {
    return false;
  }

  const { data, error } = await supabaseServerClient().from("lesson")
    .select().eq("id", lessonId).eq("owner", uid).maybeSingle();

  return !!data && !error;
}

export const useLessonsCount = async () => {
  const { count } = await supabaseServerClient()
    .from("lesson")
    .select("*", { count: "exact", head: true });
  return count || 0;
};
