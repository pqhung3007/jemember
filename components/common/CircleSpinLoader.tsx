import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function CircleSpinLoader() {
  return (
    <div className="flex min-h-full content-center justify-center">
      <div className="text-3xl">
        <ArrowPathIcon className="mr-3 inline h-8 w-8 animate-spin" />
        Loading...
      </div>
    </div>
  );
}
