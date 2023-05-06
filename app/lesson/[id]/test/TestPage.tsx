"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Question from "components/lesson/test/Question";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Card } from "type";

import { replaceAt } from "utils";
import Grade from "./Grade";
import MarkQuestion from "./MarkQuestion";
import NextQuestion from "./NextQuestion";
import PrevQuestion from "./PrevQuestion";
import QuestionButton from "./QuestionButton";
import Submit from "./Submit";
import Timer from "./Timer";

export default function TestPage({ cards }: { cards: Card[] }) {
  const [startTime, _] = useState(new Date());
  const testTimeInSeconds = 60 * 60;
  const [answers, setAnswers] = useState(new Array(cards.length).fill(""));
  const [marked, setMarked] = useState(new Array(cards.length).fill(false));

  const [remainingTimeInSec, setRemainingTime] = useState(testTimeInSeconds);
  const [isDone, setIsDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const updateAnswer = (newValue: string, index: number) => {
    setAnswers(replaceAt(answers, index, newValue));
  };

  const updateMarked = (newValue: boolean, index: number) => {
    setMarked(replaceAt(marked, index, newValue));
  };

  setInterval(() => {
    const now = new Date();
    const elapsedTime = (now.getTime() - startTime.getTime()) / 1000;
    setRemainingTime(testTimeInSeconds - elapsedTime);
    if (elapsedTime > testTimeInSeconds) {
      setIsDone(true);
    }
  }, 1000);

  const grading = useCallback(() => {
    let count = 0;
    for (let i = 0; i < answers.length; i++) {
      if (isAnswerCorrect(answers[i], cards[i].answer)) {
        count++;
      }
    }
    return count;
  }, [isDone]);

  const isAnswerCorrect = (actual: string, expected: string) => {
    return actual.toLowerCase() === expected.toLowerCase();
  };

  const nextQuestion = () => {
    if (currentQuestion < cards.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const toggleMarkThisQuestion = () => {
    updateMarked(!marked[currentQuestion], currentQuestion);
  };

  return (
    <div className="mx-auto flex flex-col gap-5 pb-20">
      <Link className="flex items-center gap-4" href=".">
        <ArrowLeftIcon className="h-6 w-6 " />
        Back
      </Link>
      {isDone && <Grade grade={grading()} max={cards.length} />}
      <div className="gap-2 md:flex">
        <div className="flex h-full grow-[4] flex-col justify-between self-stretch">
          <Question
            key={currentQuestion}
            ques={cards[currentQuestion]}
            index={currentQuestion}
            actual={answers[currentQuestion]}
            isViewResult={isDone}
            updateAnswer={updateAnswer}
          />
          <div className="flex justify-between gap-3 py-4">
            <PrevQuestion
              isDisabled={currentQuestion <= 0}
              onClick={prevQuestion}
            />
            <div className="">
              <MarkQuestion
                onClick={toggleMarkThisQuestion}
                isMarked={marked[currentQuestion]}
              />
              <NextQuestion
                isDisabled={currentQuestion === cards.length - 1}
                onClick={nextQuestion}
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid max-h-[50vmin] w-full grid-cols-10 gap-1 overflow-y-scroll md:w-[40ch] md:grid-cols-9">
            {cards.map((_, index) => (
              <QuestionButton
                isAnswered={answers[index] !== ""}
                index={index}
                setCurrentQuestion={setCurrentQuestion}
                isMarked={marked[index]}
              />
            ))}
          </div>
          {!isDone && (
            <>
              <Submit setDone={() => setIsDone(true)} />
              <Timer remainingTimeInSec={remainingTimeInSec} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
