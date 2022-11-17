export default function Loader() {
  return (
    <div className="flex min-h-[calc(100vh_-_7rem)] content-center items-center justify-center">
      <div className="text-3xl">
        <i className="fa-solid fa-spinner mr-3 inline h-8 w-8 animate-spin text-green-300"></i>
        Loading...
      </div>
    </div>
  );
}
