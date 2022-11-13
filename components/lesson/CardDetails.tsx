export default function CardDetails({ cards }: { cards: any[] }) {
  return (
    <>
      {cards.map((card, index) => (
        <div
          className="text-neutral-300 grid grid-cols-3 gap-4 rounded-xl bg-neutral-800 p-5"
          key={index}
        >
          <div className="col-span-2 whitespace-pre-wrap">{card.question}</div>
          <div className="col-span-1 whitespace-pre-wrap border-l border-neutral-600 pl-4">
            {card.answer}
          </div>
        </div>
      ))}
    </>
  );
}
