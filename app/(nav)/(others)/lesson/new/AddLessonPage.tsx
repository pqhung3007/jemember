"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "supabase";

export default function AddLesson({ count }: { count: number }) {
  const router = useRouter();

  const [lessonName, setLessonName] = useState("");

  const addLesson = async (name: string) => {
    if (count >= 100) {
      return;
    }

    await supabase.from("lesson").insert({ name: name });
    router.push("/");
  };

  const addLessonListener = async (e: any) => {
    e.preventDefault();
    await addLesson(lessonName);
    router.push("/");
  };

  return (
    <form className="p-6 text-2xl" onSubmit={addLessonListener}>
      <div className="mb-2 block font-medium text-gray-300">Lesson name</div>
      <input
        type="text"
        className="block w-full rounded-md bg-gray-700 p-2.5 text-white placeholder-gray-400 ring-1 ring-gray-500/70 focus:outline-none focus:ring-gray-400"
        placeholder="My Jemember lesson"
        required
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
      />
      <button
        type="submit"
        className="my-5 w-full cursor-pointer rounded-lg bg-green-700 px-5 py-2 text-center font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600 sm:w-auto md:text-sm"
        disabled={!lessonName && count < 100}
      >
        Create
      </button>
    </form>
  );
}
