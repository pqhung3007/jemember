export default function Timer({
  remainingTimeInSec,
}: {
  remainingTimeInSec: number;
}) {
  return (
    <div className="">
      {"Remaining time: "}
      <span className="font-bold">
        {Math.floor(remainingTimeInSec / 60)}:
        {Math.floor(remainingTimeInSec % 60)}
      </span>
    </div>
  );
}
