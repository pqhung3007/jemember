"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { supabase } from "../../../supabase";

export default function Signup() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repeatPassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(" ");

  const validate = () => {
    let pass = passRef?.current?.value;
    let repeatPass = repeatPassRef?.current?.value;
    if (pass !== repeatPass) {
      setError("Password does not match");
      return;
    }
    setError("");
  }

  const signup = async (event: any) => {
    event.preventDefault();
    let email = emailRef?.current?.value || "";
    let pass = passRef?.current?.value || "";
    const { data, error: errorServer } = await supabase.auth.signUp({
      email: email,
      password: pass,
    })
    if (!errorServer) {
      router.push("/")
    } else {
      setError(errorServer.message);
    }
  }

  return (
    <div className="relative h-screen w-screen flex justify-center items-center p-4 text-white">
      <form className="relative max-w-md rounded-xl shadow bg-neutral-700"
        onSubmit={signup}
        onChange={validate}
      >
        <div className="py-6 px-6 lg:px-8">
          <div className="mb-4 text-3xl text-center font-semibold">
            Sign up
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block text-sm font-medium text-neutral-300">
                Your email
              </div>
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Valid email address"
                className="block w-full rounded-lg border p-2.5 text-sm focus:border-green-500 focus:ring-green-500 border-neutral-500 bg-neutral-600 placeholder-neutral-400"
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
                className="block w-full rounded-lg border p-2.5 text-sm focus:border-green-500 focus:ring-green-500 border-neutral-500 bg-neutral-600 placeholder-neutral-400"
                required
              />
            </div>
            <div>
              <div className="mb-2 block text-sm font-medium">
                Repeat password
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                pattern=".{8,}"
                ref={repeatPassRef}
                title="Eight or more characters"
                className="block w-full rounded-lg border p-2.5 text-sm focus:border-green-500 focus:ring-green-500 border-neutral-500 bg-neutral-600 placeholder-neutral-400"
                required
              />
            </div>
            <div className="text-center text-red-600">
              {error}
            </div>
            <button
              className="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-neutral-800"
              disabled={error.trim() !== ""}
            >
              Create account
            </button>
            <div className="text-sm font-medium text-neutral-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="hover:underline text-green-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
