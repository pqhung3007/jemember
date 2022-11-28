import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export default function CopyButton({ copy }: { copy(): void }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const listener = async () => {
    if (textRef.current) {
      textRef.current.innerText = "Copied";
    }
    copy();
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.innerText = "Copy";
      }
    }, 500);
  };

  return (
    <div
      className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl bg-neutral-800 pl-5 pr-7 text-xl text-white hover:bg-neutral-700 focus:outline-none md:h-10 md:rounded-full md:text-sm"
      onClick={listener}
    >
      <ClipboardIcon className="h-6 w-6 text-neutral-300 md:h-4 md:w-4" />
      <p ref={textRef}>Copy</p>
    </div>
  );
}
