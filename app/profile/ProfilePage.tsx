"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { UserMetaData } from "type";
import { supabaseUpdateUserMeta } from "utils/supabase/auth/client";

export default function ProfilePage({ user }: { user: UserMetaData | null }) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);

  if (!user) {
    router.replace("/login");
  }

  const updateProfile = async () => {
    if (!nameRef.current) {
      return;
    }
    await supabaseUpdateUserMeta({
      ...(user as UserMetaData),
      name: nameRef.current.value,
    });
    router.push("/");
  };

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[16rem_1fr] gap-10 px-4 pt-28 md:pl-24 lg:px-24">
      <div className="flex flex-col gap-1 pr-4">
        <a
          href=""
          className="flex items-center rounded-full px-4 py-3 hover:bg-neutral-800"
        >
          <UserIcon className="h-6 w-6 pr-2 text-neutral-400" />
          Profile
        </a>
      </div>

      <div className="max-w-[75ch]">
        <h1 className="text-4xl font-semibold">Public profile</h1>
        <div className="flex flex-col gap-5 py-6 font-medium">
          <div className="">
            <p className="py-2 text-xl">Name</p>
            <input
              type="text"
              ref={nameRef}
              defaultValue={user?.name}
              className="w-full rounded-full bg-neutral-800 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="">
            <p className="py-2 text-xl">Email</p>
            <input
              type="text"
              defaultValue={user?.email}
              disabled
              className="w-full cursor-not-allowed rounded-full bg-neutral-800 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 py-4 text-sm font-medium text-white">
          <button
            type="button"
            onClick={updateProfile}
            className="rounded-full bg-green-800 px-5 py-3 hover:bg-green-700 focus:outline-none"
          >
            Update profile
          </button>
          <Link
            href="/"
            className="rounded-full bg-neutral-700 px-7 py-3 hover:bg-neutral-600 hover:ring-neutral-400 focus:outline-none"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
