"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { supabaseInsertLesson } from "utils";

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
    <form className="p-6 text-2xl" onSubmit={addLessonListener}>
      <div className="mb-2 block font-medium text-slate-300">Lesson name</div>
      <input
        type="text"
        className="block w-full rounded-md bg-slate-700 p-2.5 text-white placeholder-slate-400 ring-1 ring-slate-500/70 focus:outline-none focus:ring-slate-400"
        placeholder="My Jemember lesson"
        required
      />
      <button
        type="submit"
        className="my-5 w-full cursor-pointer rounded-lg bg-green-700 px-5 py-2 text-center font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-slate-800 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto md:text-sm"
        disabled={!lessonNameRef.current?.value && count < 100}
      >
        Create
      </button>
    </form>
  );
}
