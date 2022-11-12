import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function Nav({ user }: { user: User | null }) {
  return (
    <header className="border-b border-neutral-700">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-6">
        <h1 className="text-3xl font-semibold">
          <Link href="/">Jmember</Link>
        </h1>
        <div className="flex gap-5">
          {
            !user &&
            <>
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </>
          }
        </div>
      </div>
    </header>
  );
}
