import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarredIcon } from "@heroicons/react/24/solid";
import styles from "styles/Card.module.css";
import type { Card } from "type";

export default function Card(props: {
  progress: string;
  card: Card | undefined;
  isFront: boolean;
  isMarked: boolean;
  toggleMarked(cardId: string): void;
  setIsFront(isFront: boolean): void;
}): JSX.Element {
  const cardStyle = props.isFront ? "flip-card" : "flip-card-flipped";

  const markListener = () => {
    if (props.card) {
      props.toggleMarked(props.card.id);
    }
  };

  return (
    <div className={styles[cardStyle]}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <div
            className="absolute top-2 right-2 z-[99] h-6 w-6 cursor-pointer"
            onClick={markListener}
          >
            {props.isMarked ? (
              <StarredIcon className="text-yellow-500 dark:text-yellow-400" />
            ) : (
              <StarIcon className="text-gray-900 dark:text-white" />
            )}
          </div>
          <div
            className="absolute inset-0"
            onClick={() => props.setIsFront(!props.isFront)}
          >
            <p className="absolute w-full text-center font-medium">
              {props.progress}
            </p>
            <div className="mx-auto flex h-full max-w-[90%] items-center justify-center py-6 md:text-2xl">
              <p className="max-h-[100%] overflow-y-auto px-3">
                {props.card !== undefined
                  ? props.card.question
                  : "The lesson is empty."}
              </p>
            </div>
          </div>
        </div>
        <div className={styles["flip-card-back"]}>
          <div
            className="absolute top-2 right-2 z-[99] h-6 w-6 cursor-pointer"
            onClick={markListener}
          >
            {props.isMarked ? (
              <StarredIcon className="text-yellow-500 dark:text-yellow-400" />
            ) : (
              <StarIcon className="text-white" />
            )}
          </div>
          <div
            className="absolute inset-0"
            onClick={() => props.setIsFront(!props.isFront)}
          >
            <p className="absolute w-full text-center font-medium">
              {props.progress}
            </p>
            <div className="mx-auto flex h-full max-w-[90%] items-center justify-center py-6 md:text-2xl">
              <p className="max-h-[100%] overflow-y-auto px-3">
                {props.card !== undefined
                  ? props.card.answer
                  : "Please add more question."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
