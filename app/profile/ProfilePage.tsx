"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { supabaseUpdateUserMeta } from "utils/supabase/auth/client";

import { supabaseBrowserClient } from "utils/supabase/browser";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage({ user }: { user: User | null }) {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);

  const updateProfile = async () => {
    if (!usernameRef.current) {
      return;
    }
    await supabaseUpdateUserMeta(usernameRef.current.value);

    router.push("/");
    supabaseBrowserClient.auth.refreshSession();
  };

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[16rem_1fr] gap-10 px-4 pt-28 lg:px-24">
      <div className="flex flex-col gap-1 pr-4">
        <Link
          href="/profile"
          className="flex items-center rounded-full px-4 py-3 hover:bg-gray-800">
          <UserIcon className="h-6 w-6 pr-2 text-gray-400" />
          Profile
        </Link>
      </div>

      <div className="max-w-[75ch]">
        <h1 className="text-4xl font-semibold">Public profile</h1>
        <div className="flex flex-col gap-5 py-6 font-medium">
          <div className="">
            <p className="py-2 text-xl">Username</p>
            <input
              type="text"
              ref={usernameRef}
              defaultValue={user?.user_metadata.username}
              className="w-full rounded-full bg-gray-800 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="">
            <p className="py-2 text-xl">Email</p>
            <input
              type="text"
              defaultValue={user?.email}
              disabled
              className="w-full cursor-not-allowed rounded-full bg-gray-800 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 py-4 text-sm font-medium text-white">
          <button
            type="button"
            onClick={updateProfile}
            className="rounded-full bg-green-800 px-5 py-3 hover:bg-green-700 focus:outline-none">
            Update profile
          </button>
          <Link
            href="/"
            prefetch={false}
            className="rounded-full bg-gray-700 px-7 py-3 hover:bg-red-700/70 focus:outline-none">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
