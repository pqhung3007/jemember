import type { Database } from "./database";
export * from "./database";
export interface LessonProps {
  lesson: LessonBase;
  cards: Card[];
}

export type LessonBase = Database["public"]["Tables"]["lesson"]["Row"];

export type Card = Database["public"]["Tables"]["card"]["Row"];

export type UserMetaData = Database["public"]["Tables"]["users_metadata"]["Row"];
