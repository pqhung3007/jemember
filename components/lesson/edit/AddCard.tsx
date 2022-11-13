export default function AddFlashCard(props: any) {
  return (
    <div
      className="my-4 flex cursor-pointer justify-center rounded-xl bg-neutral-700 py-8 text-xl hover:bg-green-400/40"
      onClick={props.insertCard}
    >
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p className="font-semibold">Thêm thẻ</p>
      </div>
    </div>
  );
}
