"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { supabaseSignOut } from "utils/supabase/auth/client";

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

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
    <header className="fixed left-0 z-[99] w-screen bg-neutral-800 drop-shadow-lg md:h-full md:w-[5rem] md:bg-transparent md:drop-shadow-none">
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-2 md:h-screen md:flex-col md:justify-center">
        <h1 className="text-3xl font-medium">
          <Link
            prefetch={false}
            href="/"
            className="block rounded-full p-3 hover:bg-neutral-700/60"
          >
            <HomeIcon className="h-6 w-6 text-red-500" />
          </Link>
        </h1>

        <Link
          href="/lesson/new"
          prefetch={false}
          className="tooltip rounded-full p-3 after:content-['Add'] hover:bg-neutral-700/60"
        >
          <PlusIcon className="h-6 w-6 text-green-500" />
        </Link>

        {!userID && (
          <>
            <Link
              href="/login"
              prefetch={false}
              className="tooltip rounded-full p-3 after:content-['Login'] hover:bg-neutral-700/60 "
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </Link>
            <Link
              href="/signup"
              prefetch={false}
              className="tooltip rounded-full p-3 after:content-['Signup'] hover:bg-neutral-700/60"
            >
              <UserPlusIcon className="h-6 w-6" />
            </Link>
          </>
        )}

        {userID && (
          <>
            <Link
              href="/profile"
              prefetch={false}
              className="tooltip rounded-full p-3 after:content-['Profile'] hover:bg-neutral-700/60"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={signOut}
              className="tooltip rounded-full p-3 after:content-['Signout'] hover:bg-neutral-700/60"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
