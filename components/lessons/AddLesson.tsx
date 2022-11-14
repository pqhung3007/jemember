import Link from "next/link";

export default function AddLesson() {
  return (
    <Link
      href="/lesson/new"
      className="flex items-center justify-center rounded-2xl bg-green-700 px-4 py-8 hover:bg-green-600"
    >
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-green-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </p>
    </Link>
  );
}
