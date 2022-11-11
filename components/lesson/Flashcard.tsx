import styles from "../../styles/Flashcard.module.css";

export interface Card {
  id: string;
  question: string;
  answer: string;
  collection_id: string;
}

interface S {
  info: Card;
  isFront: boolean;
  setIsFront(isFront: boolean): void;
}

export default function Flashcard(props: S): JSX.Element {
  const cardStyle = props.isFront ? "flip-card" : "flip-card-flipped";

  return (
    <div
      className={styles[cardStyle]}
      onClick={() => props.setIsFront(!props.isFront)}
    >
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <p className="overflow-y-scroll max-h-[95%] md:text-2xl">{props.info?.question}</p>
        </div>
        <div className={styles["flip-card-back"]}>
          <p className="md:text-2xl">{props.info?.answer}</p>
        </div>
      </div>
    </div>
  );
}
