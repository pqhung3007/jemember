import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

export default function CopyButton({ copy }: { copy(): void }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const listener = async () => {
    setIsCopied((isCopied) => !isCopied);
    copy();
    setTimeout(() => {
      setIsCopied((isCopied) => !isCopied);
    }, 500);
  };

  return (
    <div
      className="cursor-pointer flex h-16 items-center gap-2 rounded-xl bg-gray-300 dark:bg-gray-800 pl-5 pr-7 text-xl dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none md:h-10 md:text-sm"
      onClick={listener}>
      {!isCopied ? (
        <ClipboardIcon className="h-6 w-6 text-gray-800 dark:text-gray-300 md:h-4 md:w-4" />
      ) : (
        <CheckIcon className="h-6 w-6 text-gray-800 dark:text-gray-300 md:h-4 md:w-4" />
      )}
      <p ref={textRef}>Copy</p>
    </div>
  );
}
