import FooterWave from "components/common/FooterWave";
import js from "public/js.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="min-h-[32rem] bg-neutral-900 py-16 md:pl-20">
      <FooterWave />
      <div className="grid gap-12 p-12 md:grid-cols-2">
        <div className="">
          <Link href="/" className="block py-4">
            <Image src={js} alt="JS" className="h-10 w-10" />
          </Link>
          <p>
            Jemember là một web app học flashcard lấy cảm hứng từ Quizlet được
            thiết kế cho các thành viên của câu lạc bộ JS Club.
          </p>
        </div>
        <div className="">
          <div className="">
            <p className="py-5 text-sm text-neutral-400">Social</p>
            <div className="flex flex-col gap-5">
              <a
                href="https://www.facebook.com/fu.jsclub"
                className="text-lg text-green-400"
                target="_blank"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
