import { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import styles from "../../styles/Flashcard.module.css";

interface S {
  info: DocumentData
}

export default function Flashcard(props: S): JSX.Element {
  return (
    <div className={styles["flip-card"]}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <p>
            {props.info?.question}
          </p>
        </div>
        <div className={styles["flip-card-back"]}>
          <p>{props.info?.answer}</p>
        </div>
      </div>
    </div>
  )
}
