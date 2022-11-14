import styles from "styles/Card.module.css";

export interface Card {
  id: string;
  question: string;
  answer: string;
  lesson_id: string;
}

interface Props {
  progress: string;
  card: Card;
  isFront: boolean;
  isMarked: boolean;
  toggleMarked(card_id: string): void;
  setIsFront(isFront: boolean): void;
}

export default function Card(props: Props): JSX.Element {
  const cardStyle = props.isFront ? "flip-card" : "flip-card-flipped";

  const markListener = () => {
    props.toggleMarked(props.card.id);
  };

  return (
    <div className={styles[cardStyle]}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>
          <div
            className={`absolute top-2 right-2 z-[99] h-6 w-6 cursor-pointer text-yellow-400`}
            onClick={markListener}
          >
            {props.isMarked ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
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
                {props.card?.question}
              </p>
            </div>
          </div>
        </div>
        <div className={styles["flip-card-back"]}>
          <div
            className={`absolute top-2 right-2 z-[99] h-6 w-6 cursor-pointer text-yellow-400`}
            onClick={markListener}
          >
            {props.isMarked ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
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
                {props.card?.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
