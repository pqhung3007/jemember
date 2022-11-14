"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { supabase } from "supabase";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(" ");

  const login = async (event: any) => {
    event.preventDefault();
    let email = emailRef?.current?.value || "";
    let pass = passRef?.current?.value || "";
    const { data, error: errorServer } = await supabase.auth.signInWithPassword(
      {
        email: email,
        password: pass,
      }
    );
    if (!errorServer) {
      router.push("/");
    } else {
      setError(errorServer.message);
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center p-4 text-white">
      <form
        className="relative max-w-md rounded-xl bg-gray-700 shadow"
        onSubmit={login}
      >
        <div className="py-6 px-6 lg:px-8">
          <div className="mb-4 text-center text-3xl font-semibold">Log in</div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block text-sm font-medium text-gray-300">
                Your email
              </div>
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Valid email address"
                className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block text-sm font-medium">
                Your password
              </div>
              <input
                type="password"
                name="password"
                id="password"
                ref={passRef}
                placeholder="••••••••"
                pattern=".{8,}"
                title="Eight or more characters"
                className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="text-center text-red-600">{error}</div>
            <button
              className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium hover:bg-green-600 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-800"
              disabled={error.trim() !== ""}
            >
              Log in
            </button>
            <div className="text-sm font-medium text-gray-300">
              New here ?{" "}
              <Link href="/signup" className="text-green-500 hover:underline">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
