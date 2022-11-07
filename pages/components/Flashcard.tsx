import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import styles from "../../styles/Flashcard.module.css";

interface S {
  info: DocumentData
}

export default function Flashcard(props: S): JSX.Element {

  const [isFront, setIsFront] = useState(true);

  const cardStyle = isFront ? "flip-card" : "flip-card-flipped";

  return (
    <div className={styles[cardStyle]} onClick={() => setIsFront(!isFront)}>
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
