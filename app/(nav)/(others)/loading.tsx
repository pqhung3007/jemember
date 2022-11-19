import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loader() {
  return (
    <div className="flex min-h-[calc(100vh_-_7rem)] content-center items-center justify-center">
      <div className="text-3xl">
        <ArrowPathIcon className="mr-3 inline h-8 w-8 animate-spin" />
        Loading...
      </div>
    </div>
  );
}
