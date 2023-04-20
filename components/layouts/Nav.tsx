"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { supabaseSignOut } from "utils/supabase/auth/client";

import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
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
    <div className="fixed left-0 z-[99] flex h-full flex-col items-center justify-center bg-gray-200 dark:bg-gray-900 max-md:top-0 max-md:h-auto max-md:w-full">
      <header className="flex flex-col max-md:flex-row max-md:w-full max-md:justify-between max-md:px-5 max-md:py-2">
        <Link prefetch={false} href="/" className="rounded-xl p-3">
          <HomeIcon className="h-8 w-8" />
        </Link>

        <Link
          href="/lesson/new"
          prefetch={false}
          className="tooltip rounded-xl p-3 after:content-['Add']">
          <PlusCircleIcon className="h-8 w-8" />
        </Link>

        {!userID && (
          <>
            <Link
              href="/login"
              prefetch={false}
              className="tooltip rounded-xl p-3 after:content-['Login']">
              <ArrowRightOnRectangleIcon className="h-8 w-8" />
            </Link>
            <Link
              href="/signup"
              prefetch={false}
              className="tooltip rounded-xl p-3 after:content-['Signup']">
              <UserPlusIcon className="h-8 w-8" />
            </Link>
          </>
        )}

        {userID && (
          <>
            <Link
              href="/profile"
              prefetch={false}
              className="tooltip rounded-xl p-3 after:content-['Profile']">
              <UserIcon className="h-8 w-8" />
            </Link>
            <button
              onClick={signOut}
              className="tooltip rounded-xl p-3 after:content-['Signout']">
              <ArrowLeftOnRectangleIcon className="h-8 w-8" />
            </button>
          </>
        )}
      </header>
    </div>
  );
}
