"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { supabaseSignOut } from "utils/supabase/auth/client";

import {
  ArrowRightOnRectangleIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import "styles/Nav.css";
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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
    <div className="lef-0 fixed z-[99] flex h-full flex-col items-center justify-center bg-gray-900 max-md:top-0 max-md:h-auto max-md:w-full">
      <header className="flex flex-col max-md:flex-row">
        <Link
          prefetch={false}
          href="/"
          className="rounded-xl border border-transparent p-3 hover:border-gray-700/90">
          <HomeIcon className="h-6 w-6" />
        </Link>

        <Link
          href="/lesson/new"
          prefetch={false}
          className="rounded-xl border border-transparent p-3 hover:border-gray-700/90">
          <PlusCircleIcon className="h-6 w-6" />
        </Link>

        {!userID && (
          <>
            <Link
              href="/login"
              prefetch={false}
              className="rounded-xl border border-transparent p-3 hover:border-gray-700/90">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </Link>
            <Link
              href="/signup"
              prefetch={false}
              className="rounded-xl border border-transparent p-3 hover:border-gray-700/90">
              Signup
            </Link>
          </>
        )}

        {userID && (
          <>
            <Link
              href="/profile"
              prefetch={false}
              className="rounded-xl border border-transparent p-3 hover:border-gray-700/90">
              <UserIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={signOut}
              className="rounded-xl border border-transparent p-3 hover:border-gray-700/90">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </header>
    </div>
  );
}
