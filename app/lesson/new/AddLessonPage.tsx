"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { supabaseInsertLesson } from "utils/supabase/lesson/client";

export default function AddLesson({ count }: { count: number }) {
  const router = useRouter();
  const lessonNameRef = useRef<HTMLInputElement>(null);

  const addLessonHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (lessonNameRef.current && count < 100) {
      await supabaseInsertLesson(lessonNameRef.current?.value.trim());
    }
    router.push("/");
  };

  return (
    <form
      className="flex h-screen flex-col justify-center p-6 pt-8 text-2xl"
      onSubmit={addLessonHandler}>
      <div className="mb-3 block pl-3 font-medium text-gray-800 dark:text-gray-300">
        Lesson name
      </div>
      <input
        ref={lessonNameRef}
        type="text"
        className="block w-full rounded-full bg-gray-700 p-3 dark:text-white placeholder-gray-400 focus:outline-none"
        placeholder="My Jemember lesson"
        required
      />
      {count >= 100 && (
        <p className="mt-5 text-red-500">
          Cannot add more lesson because the limit is reached
        </p>
      )}
      <button
        type="submit"
        className="my-5 w-full cursor-pointer rounded-full bg-green-700 px-5 py-3 text-center font-medium dark:text-white hover:bg-green-600 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-600 sm:w-auto md:text-sm"
        disabled={count >= 100}>
        Create
      </button>
    </form>
  );
}
