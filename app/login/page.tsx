import { authStatusOrRedirect } from "utils/supabase/auth/server";

import LoginForm from "./LoginForm";

export default async function Login() {
  await authStatusOrRedirect(false, "/");

  return (
    <div className="relative flex h-screen w-screen items-center justify-center p-4 text-white">
      <LoginForm />
    </div>
  );
}
