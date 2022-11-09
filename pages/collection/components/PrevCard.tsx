export default function PrevCard({ prevButtonStyle, prev }: any) {
  return (
    <div
      className={`inline-block lg:px-5 px-3 py-3 ${prevButtonStyle} rounded-xl`}
      onClick={prev}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
}
