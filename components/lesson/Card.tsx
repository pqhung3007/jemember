import styles from "../../styles/Card.module.css";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export interface Card {
  id: string;
  question: string;
  answer: string;
  lesson_id: string;
}

interface Props {
  size: number;
  index: number;
  card: Card;
  isFront: boolean;
  isMarked: boolean;
  toggleMarked(card_id: string): void;
  setIsFront(isFront: boolean): void;
}

export default function Card(props: Props): JSX.Element {
  const cardStyle = props.isFront ? "flip-card" : "flip-card-flipped";

  const markListener = (e: any) => {
    e.preventDefault();
    props.toggleMarked(props.card.id);
  }

  return (
    <div className={styles[cardStyle]}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <div className={`absolute top-2 right-2 cursor-pointer z-[99] ${!props.isFront ? "hidden" : ""}`}
            onClick={markListener}>
            {props.isMarked ?
              <StarIconSolid className="h-6 w-6 text-yellow-400" /> :
              <StarIcon className="h-6 w-6 text-yellow-400" />
            }
          </div>
          <div className="absolute inset-0" onClick={() => props.setIsFront(!props.isFront)}>
            <p className="absolute top-1 right-[50%] font-medium">
              {props.index + 1} / {props.size}
            </p>
            <div className="max-w-[90%] mx-auto p-8 h-full md:text-2xl justify-center flex items-center">
              <p className="max-h-[100%] px-3 overflow-y-scroll">
                {props.card?.question}
              </p>
            </div>
          </div>
        </div>
        <div className={styles["flip-card-back"]}>
          <div className={`absolute top-2 right-2 cursor-pointer z-[99] ${props.isFront ? "hidden" : ""}`}
            onClick={markListener}>
            {props.isMarked ?
              <StarIconSolid className="h-6 w-6 text-yellow-400" /> :
              <StarIcon className="h-6 w-6 text-yellow-400" />
            }
          </div>
          <div className="absolute inset-0" onClick={() => props.setIsFront(!props.isFront)}>
            <p className="absolute top-1 right-[50%] font-medium">
              {props.index + 1} / {props.size}
            </p>
            <div className="max-w-[90%] mx-auto p-8 h-full md:text-2xl justify-center flex items-center">
              <p className="max-h-[100%] px-3 overflow-y-scroll">
                {props.card?.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
