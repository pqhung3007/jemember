"use client";

import a from "next/link";
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
    <header className="fixed top-0 z-[99] w-full bg-slate-800 shadow-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-4">
        <h1 className="text-3xl font-medium">
          <a href="/" className="flex">
            <p className="text-red-500">J</p>
            <p>emember</p>
          </a>
        </h1>
        {!user.id && (
          <div className="flex gap-5">
            <a href="/login">Log in</a>
            <a href="/signup">Sign up</a>
          </div>
        )}
        {user.id && (
          <div className="disabled flex gap-5">
            <a href="/profile">{user.name}</a>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
}
