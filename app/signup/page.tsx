import { redirect } from "next/navigation";
import { useCurrentUserSession } from "utils/supabase/auth/server";

import SignupForm from "./SignupForm";

export default async function Signup() {
  const { user } = await useCurrentUserSession();

  if (user) {
    redirect("/");
  }

  return (
    <div className="relative flex h-screen w-screen items-center justify-center p-4 text-white">
      <SignupForm />
    </div>
  );
}
