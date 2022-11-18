"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { UserProps } from "types";
import { supabaseUpdateUserMeta } from "utils";

export default function ProfilePage({ user }: { user: UserProps }) {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);

  if (!user) {
    router.push("/login");
  }

  const updateProfile = async () => {
    if (!nameRef.current) {
      return;
    }
    await supabaseUpdateUserMeta({
      ...user,
      name: nameRef.current.value,
    });
    router.push("/");
  };

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[16rem_1fr] gap-10 px-4 pt-28">
      <div className="flex flex-col gap-1 pr-4">
        <a href="" className="rounded-lg px-4 py-1.5 hover:bg-gray-800">
          <i className="fa-regular fa-user fa-sm pr-2 text-gray-400"></i>
          Profile
        </a>
        {/* <a href="/" className="rounded-lg px-4 py-1.5 hover:bg-gray-800">
          <i className="fa-solid fa-shield-halved pr-2 text-gray-400"></i>
          Password
        </a> */}
      </div>
      <div className="max-w-[75ch]">
        <h1 className="border-b border-gray-800 pb-5 text-4xl font-semibold">
          Public profile
        </h1>
        <div className="flex flex-col gap-3 py-6 font-medium">
          <div className="">
            <p className="py-2 text-lg">Name</p>
            <input
              type="text"
              ref={nameRef}
              defaultValue={user.name}
              className="w-full rounded border border-gray-700 bg-gray-900 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
          </div>
          <div className="">
            <p className="py-2 text-lg">Email</p>
            <input
              type="text"
              defaultValue={user.email}
              disabled
              className="w-full cursor-not-allowed rounded border border-gray-700 bg-gray-900 px-4 py-2 focus:border-green-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 text-sm font-medium text-white">
          <button
            type="button"
            onClick={updateProfile}
            className="rounded-lg border border-green-700 bg-green-700 px-6 py-1.5 hover:bg-green-600 focus:outline-none"
          >
            Update profile
          </button>
          <Link
            href="/"
            className="rounded-lg bg-gray-700 px-6 py-1.5 ring-1 ring-gray-600 hover:bg-gray-600 hover:ring-gray-400 focus:outline-none"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
