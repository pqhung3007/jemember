import { supabase } from "supabase";
import { UserProps } from "types";

export const supabaseGetCurrentUID = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session?.user.id || "";
};

export const supabaseGetCurrentUserMetadata = async () => {
  const user = await supabaseGetCurrentUser();
  if (!user) {
    return;
  }
  const { data, error } = await supabase
    .from("users_metadata")
    .select("name")
    .eq("id", user.id);
  if (!data || data.length === 0) {
    return;
  }
  return {
    id: user.id,
    name: (data[0].name as string) || "",
    email: user.email || "",
  };
};

export const supabaseGetCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  return data.session?.user;
};

export const supabaseUpdateUserMeta = async (user: UserProps) => {
  const { error } = await supabase
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
