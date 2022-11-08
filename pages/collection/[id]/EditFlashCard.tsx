import { DocumentData } from "firebase/firestore";
import { useRef } from "react";

interface S {
  info: DocumentData;
  index: number;
  id: string;
  updateFlashCard(newData: DocumentData): void;
}

export default function EditFlashCard(props: S) {
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  const update = () => {
    let newQuestion = questionRef.current?.value;
    let newAnswer = answerRef.current?.value;
    props.updateFlashCard({
      id: props.id,
      question: newQuestion,
      answer: newAnswer,
      collection_id: props.info.collection_id,
    });
  };

  return (
    <div className="my-4 rounded-xl bg-gray-700 text-xl">
      <p className="border-b-2 border-gray-900 px-4 py-2 font-semibold">
        {props.index + 1}
      </p>
      <div className="grid gap-6 px-4 py-6 lg:grid-cols-2">
        <p className="max-w-[100%]">
          <input
            type="text"
            className="block w-full border-b bg-gray-700 focus:border-blue-500 focus:outline-none"
            ref={questionRef}
            onChange={update}
            value={props.info?.question}
          />
        </p>
        <p className="max-w-[100%]">
          <input
            type="text"
            className="block w-full border-b bg-gray-700 focus:border-blue-500 focus:outline-none"
            ref={answerRef}
            onChange={update}
            value={props.info?.answer}
          />
        </p>
      </div>
    </div>
  );
}
