"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProps } from "types";
import { supabaseGetCurrentUserMetadata, supabaseSignOut } from "utils";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    supabaseGetCurrentUserMetadata().then((user) => {
      if (user) setUser(user);
    });
  }, []);

  const logout = async () => {
    const { error } = await supabaseSignOut();
    if (error) {
      console.error(error);
    }
    setUser({} as UserProps);
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-[99] w-full bg-gray-800 shadow-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-4">
        <h1 className="text-3xl font-semibold">
          <Link href="/" className="flex">
            <p className="text-red-500">J</p>
            <p>emember</p>
          </Link>
        </h1>
        {!user.id && (
          <div className="flex gap-5">
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </div>
        )}
        {user.id && (
          <div className="disabled flex gap-5">
            <Link href="/profile">{user.name}</Link>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
}
