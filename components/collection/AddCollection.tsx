import Link from "next/link";

export default function AddCollection() {
  return (
    <Link
      href="/collection/new"
      className="flex items-center justify-center rounded-2xl bg-gray-800 px-4 py-8 hover:bg-blue-400/40"
    >
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-blue-500"
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
