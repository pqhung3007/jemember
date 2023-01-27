"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { Card } from "type";

export default function EditCard(props: {
  info: Card;
  index: number;
  id: string;
  updateCard(newData: Card): void;
  deleteCard(id: string): void;
}) {
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  let typingTimer: NodeJS.Timeout;

  useEffect(() => {
    const newQuestion = questionRef.current?.value;
    const newAnswer = answerRef.current?.value;
    const questionLength = newQuestion?.split("\n").length || 0;
    const answerLength = newAnswer?.split("\n").length || 0;

    if (questionRef.current) {
      questionRef.current.rows = questionLength;
    }

    if (answerRef.current) {
      answerRef.current.rows = answerLength;
    }
  }, [questionRef.current?.value, answerRef.current?.value]);

  const update = () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      const newQuestion = questionRef.current?.value || "";
      const newAnswer = answerRef.current?.value || "";
      props.updateCard({
        id: props.id,
        question: newQuestion,
        answer: newAnswer,
        lesson_id: props.info.lesson_id,
      });
    }, 500);
  };

  const deleteListener = () => {
    props.deleteCard(props.id);
  };

  return (
    <div className="my-4 rounded-xl bg-gray-700 text-xl">
      <div className="flex items-center justify-between border-b-2 border-gray-900 px-4 py-2 font-semibold">
        <p>{props.index + 1}</p>
        <TrashIcon
          className="h-6 w-6 cursor-pointer text-red-600"
          onClick={deleteListener}
        />
      </div>
      <div className="grid gap-6 px-4 py-6 lg:grid-cols-2">
        <p className="max-w-[100%]">
          <textarea
            className="block w-full resize-none border-b bg-gray-700 focus:border-gray-500 focus:outline-none"
            ref={questionRef}
            onKeyDown={() => clearTimeout(typingTimer)}
            onKeyUp={update}
            defaultValue={props.info?.question}></textarea>
        </p>
        <p className="max-w-[100%]">
          <textarea
            className="block w-full resize-none border-b bg-gray-700 focus:border-gray-500 focus:outline-none"
            ref={answerRef}
            onKeyDown={() => clearTimeout(typingTimer)}
            onKeyUp={update}
            defaultValue={props.info?.answer}></textarea>
        </p>
      </div>
    </div>
  );
}
