import { supabaseBrowserClient as supabase } from "../browser";
import type { UserMetaData } from "type";

export const supabaseGetCurrentUID = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id || "";
};

export const supabaseGetCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user;
};

export const supabaseUpdateUserMeta = async (user: UserMetaData) => {
  await supabase
    .from("users_metadata")
    .update({
      name: user.name,
    })
    .match({
      id: user.id,
    });
};

export const supabaseSignin = async (email: string, pass: string) => {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });
};

export const supabaseSignup = async (email: string, pass: string) => {
  return await supabase.auth.signUp({
    email: email,
    password: pass,
  });
};

export const supabaseSignOut = async () => {
  return await supabase.auth.signOut();
};
