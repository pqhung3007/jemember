import { Timestamp } from "firebase/firestore";
import styles from "../../styles/Flashcard.module.css";

export interface FlashCard {
  answer: string,
  collection_id: string,
  question: string,
}

export default function Flashcard(info: FlashCard): JSX.Element {
  return (
    <div className={styles["flip-card"]}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <p>
            {info.question}
          </p>
        </div>
        <div className={styles["flip-card-back"]}>
          <p>{info.answer}</p>
        </div>
      </div>
    </div>
  )
}
