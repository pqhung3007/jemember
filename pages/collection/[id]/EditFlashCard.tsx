import { DocumentData } from "firebase/firestore"
import { useRef } from "react";

interface S {
  info: DocumentData,
  index: number,
  id: string,
  updateFlashCard(newData: DocumentData): void
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
      collection_id: props.info.collection_id
    })
  }

  return (
    <div className="bg-gray-700 my-4 rounded-xl text-xl">
      <p className="px-4 py-2 col-span-2 border-b-2 border-gray-900 font-semibold">
        {props.index + 1}
      </p>
      <div className="px-4 py-6 grid grid-cols-2 gap-6">
        <p>
          <input type="text"
            className="border-b bg-gray-700 focus:border-blue-500 focus:outline-none"
            ref={questionRef}
            onChange={update}
            value={props.info?.question}
          />
        </p>
        <p>
          <input type="text"
            className="border-b bg-gray-700 focus:border-blue-500 focus:outline-none"
            ref={answerRef}
            onChange={update}
            value={props.info?.answer}
          />
        </p>
      </div>
    </div>
  )
}
