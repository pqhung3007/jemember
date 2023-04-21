import { authStatusOrRedirect } from "utils/supabase/auth/server";

import SignupForm from "./SignupForm";

export default async function Signup() {
  await authStatusOrRedirect(false, "/");

  return (
    <div className="relative flex h-screen w-full items-center justify-center p-4 dark:text-white">
      <SignupForm />
    </div>
  );
}
