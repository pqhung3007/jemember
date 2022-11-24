import { redirect } from "next/navigation";
import { useCurrentUserSession } from "utils/supabase/auth/server";

import LoginForm from "./LoginForm";

export default async function Login() {
  const { user } = await useCurrentUserSession();

  if (user) {
    redirect("/");
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center p-4 text-white">
      <LoginForm />
    </div>
  );
}
