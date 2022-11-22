"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { supabaseSignOut } from "utils/supabase/auth/client";

import type { UserMetaData } from "type";

export default function Nav({ user }: { user: UserMetaData | null }) {
  const isNotRendered = ["login", "signup"].includes(useSelectedLayoutSegment() ?? "");

  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabaseSignOut();

    if (error) {
      throw new Error(error.message);
    }

    router.push("/");
  };

  return isNotRendered ? null : ( 
    <header className="fixed top-0 z-[99] w-full bg-slate-800 shadow-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-4">
        <h1 className="text-3xl font-medium">
          <Link href="/" className="flex">
            <p className="text-red-500">J</p>
            <p>emember</p>
          </Link>
        </h1>

        {!user?.id && (
          <div className="flex gap-5">
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </div>
        )}

        {user?.id && (
          <div className="disabled flex gap-5">
            <Link href="/profile">{user.name}</Link>
            <button onClick={signOut}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
}
