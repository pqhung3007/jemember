"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { supabaseInsertLesson } from "utils/supabase/lesson/client";

export default function AddLesson({ count }: { count: number }) {
  const router = useRouter();
  const lessonNameRef = useRef<HTMLInputElement>();

  const addLesson = async (name: string) => {
    if (count >= 100) {
      return;
    }

    await supabaseInsertLesson(name);
    router.push("/");
  };

  const addLessonListener = async (e: FormEvent) => {
    e.preventDefault();
    if (lessonNameRef.current) {
      await addLesson(lessonNameRef.current?.value);
    }
    router.push("/");
  };

  return (
    <form
      className="flex h-screen flex-col justify-center p-6 pt-8 text-2xl"
      onSubmit={addLessonListener}
    >
      <div className="mb-3 block pl-3 font-medium text-neutral-300">
        Lesson name
      </div>
      <input
        type="text"
        className="block w-full rounded-full bg-neutral-700 p-3 text-white placeholder-neutral-400 focus:outline-none"
        placeholder="My Jemember lesson"
        required
      />
      <button
        type="submit"
        className="my-5 w-full cursor-pointer rounded-full bg-green-700 px-5 py-3 text-center font-medium text-white hover:bg-green-600 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-600 sm:w-auto md:text-sm"
        disabled={lessonNameRef.current?.value === ""}
      >
        Create
      </button>
    </form>
  );
}
