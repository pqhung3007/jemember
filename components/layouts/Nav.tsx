"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { supabaseSignOut } from "utils/supabase/auth/client";

import { Bars2Icon } from "@heroicons/react/24/solid";
import "styles/Nav.css";

export default function Nav({ userID }: { userID: string | undefined }) {
  const isNotRendered = useSelectedLayoutSegments().some((x) =>
    ["login", "signup", "learn"].includes(x)
  );

  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabaseSignOut();

    if (error) {
      throw new Error(error.message);
    }

    router.push("/");
    router.refresh();
  };

  return isNotRendered ? null : (
    <div className="fixed bottom-8 z-[99] flex w-full justify-center">
      <input type="checkbox" name="" id="ham" className="peer hidden" />
      <header className="peered m-2 flex items-center gap-3 rounded-xl bg-slate-700 p-2 transition-all duration-100 max-md:flex-col-reverse max-md:peer-checked:w-full">
        <div className="flex items-center max-md:w-full">
          <Link
            prefetch={false}
            href="/"
            className="block rounded-xl bg-gray-900 px-7 py-4 font-medium max-md:grow">
            j.home
          </Link>

          <label className="hidden max-md:block" htmlFor="ham">
            <Bars2Icon className="mx-2 h-6 w-6 text-gray-200" />
          </label>
        </div>

        <div className="menu items-center rounded-xl bg-gray-800 p-1 max-md:hidden max-md:w-full max-md:flex-col">
          <Link
            href="/lesson/new"
            prefetch={false}
            className="rounded-xl border border-transparent py-3 px-5 hover:border-gray-700/90">
            Add
          </Link>

          {!userID && (
            <>
              <Link
                href="/login"
                prefetch={false}
                className="rounded-xl border border-transparent py-3 px-5 hover:border-gray-700/90">
                Login
              </Link>
              <Link
                href="/signup"
                prefetch={false}
                className="rounded-xl border border-transparent py-3 px-5 hover:border-gray-700/90">
                Signup
              </Link>
            </>
          )}

          {userID && (
            <>
              <Link
                href="/profile"
                prefetch={false}
                className="rounded-xl border border-transparent py-3 px-5 hover:border-gray-700/90">
                Profile
              </Link>
              <button
                onClick={signOut}
                className="rounded-xl border border-transparent py-3 px-5 hover:border-gray-700/90">
                Log out
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
