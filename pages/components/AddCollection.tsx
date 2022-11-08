export default function AddCollection() {
  return (
    <a href="/collection/new" className="rounded-2xl px-4 py-8 bg-gray-800 hover:bg-blue-400/40 flex justify-center items-center">
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-500 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </p>
    </a>
  )
}
