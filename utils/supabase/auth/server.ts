import "server-only";

import { supabaseServerClient } from "../server";
import { redirect } from "next/navigation";

export async function useCurrentUserSession() {
  const {
    data: { session },
    error,
  } = await supabaseServerClient().auth.getSession();

  if (error) throw new Error(error.message);

  const user = session?.user ?? null;
  return { user, session };
}

export async function authStatusOrRedirect(isAuth: boolean, location: string) {
  const { user } = await useCurrentUserSession();

  if (isAuth ? !user : user) {
    redirect(location);
  }
}
