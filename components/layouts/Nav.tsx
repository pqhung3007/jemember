"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseGetCurrentUser, supabaseSignOut } from "utils";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    supabaseGetCurrentUser().then((user) => {
      if (user) setUser(user);
    });
  }, []);

  const logout = async () => {
    const { error } = await supabaseSignOut();
    if (error) {
      console.error(error);
    }
    setUser({} as User);
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-[99] w-full border-b border-gray-700 bg-gray-900">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-6">
        <h1 className="text-3xl font-semibold">
          <Link href="/" className="flex">
            <p className="text-red-500">J</p>
            emember
          </Link>
        </h1>
        {!user.id && (
          <div className="flex gap-5">
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </div>
        )}
        {user.id && (
          <div className="flex gap-5">
            <p>{user.email}</p>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
}
