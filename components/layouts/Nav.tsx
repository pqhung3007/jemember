"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { use } from "react";
import {
  supabaseGetCurrentUser,
  supabaseSignOut,
} from "utils/supabase/auth/client";

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import SupabaseListener from "components/common/SupabaseListener";

export default function Nav() {
  const { user, session } = use(supabaseGetCurrentUser());

  const isNotRendered = ["login", "signup"].includes(
    useSelectedLayoutSegment() ?? ""
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
    <>
      <SupabaseListener accessToken={session?.access_token} />
      <header className="fixed left-0 z-[99] w-screen bg-neutral-800 md:h-full md:w-[5rem] md:bg-transparent">
        <div className="mx-auto flex w-full items-center justify-between gap-3 px-2 md:h-screen md:flex-col md:justify-center">
          <h1 className="p-3 text-3xl font-medium">
            <Link prefetch={false} href="/">
              <p className="text-red-500">J</p>
            </Link>
          </h1>

          <Link
            href="/lesson/new"
            prefetch={false}
            className="tooltip rounded-full p-3 after:content-['Add'] hover:bg-green-800/40"
          >
            <PlusIcon className="h-6 w-6" />
          </Link>

          {!user?.id && (
            <>
              <Link
                href="/login"
                prefetch={false}
                className="tooltip rounded-full p-3 after:content-['Login'] hover:bg-green-800/40 "
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </Link>
              <Link
                href="/signup"
                prefetch={false}
                className="tooltip rounded-full p-3 after:content-['Signup'] hover:bg-green-800/40"
              >
                <UserPlusIcon className="h-6 w-6" />
              </Link>
            </>
          )}

          {user?.id && (
            <>
              <Link
                href="/profile"
                prefetch={false}
                className="tooltip rounded-full p-3 after:content-['Profile'] hover:bg-green-800/40"
              >
                <UserIcon className="h-6 w-6" />
              </Link>
              <button
                onClick={signOut}
                className="tooltip rounded-full p-3 after:content-['Signout'] hover:bg-green-800/40"
              >
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
