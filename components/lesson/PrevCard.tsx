"use client";

export default function PrevCard({
  isDisabled,
  prev,
}: {
  isDisabled: boolean;
  prev: () => void;
}) {
  return (
    <button
      className="inline-block rounded-xl bg-green-700 px-3 py-3 disabled:cursor-not-allowed disabled:bg-gray-700 lg:px-5"
      onClick={prev}
      disabled={isDisabled}
    >
      <i className="fa-solid fa-xl fa-caret-left"></i>
    </button>
  );
}
