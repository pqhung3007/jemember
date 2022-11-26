import "server-only";

import type { User } from "@supabase/supabase-js";
import type { UserMetaData } from "type";

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

export const useCurrentUserMetadata = async (
  user: User
): Promise<UserMetaData> => {
  const { data, error } = await supabaseServerClient()
    .from("users_metadata")
    .select("name")
    .eq("id", user.id);

  if (error) throw new Error(error.message);

  return {
    id: user.id,
    name: data[0]?.name ?? "",
  };
};

export async function authStatusOrRedirect(isAuth: boolean, location: string) {
  const { user } =  await useCurrentUserSession();

  if (isAuth ? !user : user) {
    redirect(location);
  }
}
