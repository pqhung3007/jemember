export default function Header() {
  return (
    <div className="border-b border-gray-700">
      <div className="max-w-[1500px] px-5 py-6 mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-semibold"><a href="/">Jmember</a></h1>
        <form>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" className="block px-4 py-3 pl-10 w-full text-sm rounded-xl border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search Collections..." required />
          </div>
        </form>
      </div>
    </div>
  )
}
