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

  const addLessonListener = (e: any) => {
    e.preventDefault();
    addLesson(lessonName);
    router.push("/");
  };

  return (
    <form className="p-6" onSubmit={addLessonListener}>
      <div className="mb-2 block text-xl font-medium text-gray-300">
        Lesson name
      </div>
      <input
        type="text"
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500/70"
        placeholder="My Jmember lesson"
        required
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
      />
      <button
        type="submit"
        className="my-5 w-full cursor-pointer rounded-lg bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-800 sm:w-auto"
        disabled={!lessonName && count < 100}
      >
        Create
      </button>
    </form>
  );
}