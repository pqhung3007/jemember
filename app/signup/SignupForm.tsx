"use client";

import Image from "next/image";
import js from "public/js.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { supabaseSignup } from "utils/supabase/auth/client";

export default function SignupForm() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repeatPassRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(" ");

  const validate = () => {
    const pass = passRef?.current?.value;
    const repeatPass = repeatPassRef?.current?.value;
    if (pass !== repeatPass) {
      setError("Password does not match");
    } else {
      setError("");
    }
  };

  const signup = async (event: FormEvent) => {
    event.preventDefault();
    const email = emailRef?.current?.value || "";
    const pass = passRef?.current?.value || "";
    const username = usernameRef?.current?.value || "";
    const { error: errorServer } = await supabaseSignup(email, pass, username);
    if (!errorServer) {
      router.push("/login");
    } else {
      setError(errorServer.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Link href="/" className="m-5">
        <Image alt="Jemember" className="h-12 w-12" src={js} />
      </Link>
      <div className="mb-6 text-center text-4xl font-semibold">
        Sign up to Jemember
      </div>
      <form
        className="relative max-w-md rounded-2xl bg-neutral-700 shadow md:w-[60ch]"
        onSubmit={signup}
        onChange={validate}>
        <div className="py-6 px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <div className="mb-2 block text-sm font-medium">
                Your username
              </div>
              <input
                type="text"
                name="username"
                ref={usernameRef}
                className="block w-full rounded-full border border-neutral-500 bg-neutral-800 p-2.5 text-sm placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <div className="mb-2 block text-sm font-medium">Your email</div>
              <input
                type="email"
                name="email"
                ref={emailRef}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Valid email address"
                className="block w-full rounded-full border border-neutral-500 bg-neutral-800 p-2.5 text-sm placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
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
                ref={passRef}
                placeholder="••••••••"
                pattern=".{8,}"
                title="Eight or more characters"
                className="block w-full rounded-full border border-neutral-500 bg-neutral-800 p-2.5 text-sm placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <div className="mb-2 block text-sm font-medium">
                Repeat password
              </div>
              <input
                type="password"
                name="repeat_password"
                placeholder="••••••••"
                pattern=".{8,}"
                ref={repeatPassRef}
                title="Eight or more characters"
                className="block w-full rounded-full border border-neutral-500 bg-neutral-800 p-2.5 text-sm placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
                required
              />
            </div>
            <div className="text-center text-red-600">{error}</div>
            <button
              className="w-full rounded-full bg-green-800 px-5 py-3 text-center text-sm font-medium text-neutral-200 hover:bg-green-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-200"
              disabled={error.trim() !== ""}>
              Create account
            </button>
            <div className="text-sm font-medium text-neutral-300">
              Already have an account?{" "}
              <Link href="/login" className="text-green-500 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
