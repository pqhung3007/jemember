"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "supabase";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (session.data.session?.user) setUser(session.data.session?.user);
    });
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    setUser({} as User);
    router.push("/");
  };

  return (
    <header className="border-b border-gray-700">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-6">
        <h1 className="text-3xl font-semibold">
          <Link href="/" className="flex">
            <p className="text-red-500">J</p>
            member
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
