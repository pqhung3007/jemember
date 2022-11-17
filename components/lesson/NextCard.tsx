"use client";

export default function NextCard({
  isDisabled,
  next,
}: {
  isDisabled: boolean;
  next: () => void;
}) {
  return (
    <button
      className="inline-block rounded-xl bg-green-700 px-3 py-3 disabled:cursor-not-allowed disabled:bg-gray-700 lg:px-5"
      onClick={next}
      disabled={isDisabled}
    >
      <i className="fa-solid fa-xl fa-caret-right"></i>
    </button>
  );
}
