export default function NextCard({ nextButtonStyle, next }: any) {
  return (
    <div className={`inline-block cursor-pointer px-5 py-3 ${nextButtonStyle} rounded-xl`}
      onClick={next}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  )
}
