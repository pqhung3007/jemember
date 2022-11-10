"use client";

import { DocumentData } from "firebase/firestore";
import { useEffect, useRef } from "react";

interface S {
  info: DocumentData;
  index: number;
  id: string;
  // updateFlashCard(newData: DocumentData): void;
}

export default function EditFlashCard(props: S) {
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let newQuestion = questionRef.current?.value;
    let newAnswer = answerRef.current?.value;
    let questionLength = newQuestion?.split("\n").length || 0;
    let answerLength = newAnswer?.split("\n").length || 0;

    if (questionRef.current) {
      questionRef.current.rows = questionLength;
    }

    if (answerRef.current) {
      answerRef.current.rows = answerLength;
    }
  }, [questionRef.current?.value, answerRef.current?.value]);

  const update = () => {
    let newQuestion = questionRef.current?.value;
    let newAnswer = answerRef.current?.value;

    // props.updateFlashCard({
    //   id: props.id,
    //   question: newQuestion,
    //   answer: newAnswer,
    //   collection_id: props.info.collection_id,
    // });
  };

  return (
    <div className="my-4 rounded-xl bg-gray-700 text-xl">
      <p className="border-b-2 border-gray-900 px-4 py-2 font-semibold">
        {props.index + 1}
      </p>
      <div className="grid gap-6 px-4 py-6 lg:grid-cols-2">
        <p className="max-w-[100%]">
          <textarea
            className="block w-full resize-none border-b bg-gray-700 focus:border-blue-500 focus:outline-none"
            ref={questionRef}
            onChange={update}
            value={props.info?.question}
          ></textarea>
        </p>
        <p className="max-w-[100%]">
          <textarea
            className="block w-full resize-none border-b bg-gray-700 focus:border-blue-500 focus:outline-none"
            ref={answerRef}
            onChange={update}
            value={props.info?.answer}
          ></textarea>
        </p>
      </div>
    </div>
  );
}
