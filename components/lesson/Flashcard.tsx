import styles from "../../styles/Flashcard.module.css";

export interface Card {
  id: string;
  question: string;
  answer: string;
  collection_id: string;
}

interface Props {
  size: number;
  index: number;
  info: Card;
  isFront: boolean;
  setIsFront(isFront: boolean): void;
}

export default function Flashcard(props: Props): JSX.Element {
  const cardStyle = props.isFront ? "flip-card" : "flip-card-flipped";

  return (
    <div
      className={styles[cardStyle]}
      onClick={() => props.setIsFront(!props.isFront)}
    >
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <p className="absolute top-4 font-medium">
            {props.index + 1} / {props.size}
          </p>
          <p className="max-h-[95%] overflow-y-scroll md:text-2xl">
            {props.info?.question}
          </p>
        </div>
        <div className={styles["flip-card-back"]}>
          <p className="absolute top-4 font-medium">
            {props.index + 1} / {props.size}
          </p>
          <p className="md:text-2xl">{props.info?.answer}</p>
        </div>
      </div>
    </div>
  );
}
