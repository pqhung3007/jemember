"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "supabase";

export default function Nav() {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (session.data.session?.user) setUser(session.data.session?.user);
    });
  }, []);

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
        {user.id && <p>{user.email}</p>}
      </div>
    </header>
  );
}
