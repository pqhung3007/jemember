import "server-only";

import type { User } from "@supabase/supabase-js";
import type { UserMetaData } from "type";

import { supabaseServerClient } from "../server";

export async function useCurrentUserSession() {
  const {
    data: { session },
    error,
  } = await supabaseServerClient().auth.getSession();

  if (error) 
    throw new Error(error.message);
  

  const user = session?.user;
  return { user, session };
}

export const useCurrentUserMetadata = async (user: User): Promise<UserMetaData | null> => {
  const { data } = await supabaseServerClient()
    .from("users_metadata")
    .select("name")
    .eq("id", user.id);

  if (!data || data.length === 0) {
    return null;
  }

  return {
    id: user.id,
    name: data[0].name ?? "",
    email: user.email ?? "",
  };
}
