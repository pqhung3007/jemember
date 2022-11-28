import { supabaseBrowserClient as supabase } from "../browser";

export const supabaseGetCurrentUID = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id || "";
};

export const supabaseGetCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  return { user, session };
};

export const supabaseUpdateUserMeta = async (username: string) => {
  await supabase.auth.updateUser({
    data: { username },
  });
};

export const supabaseSignin = async (email: string, pass: string) => {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: pass,
  });
};

export const supabaseSignup = async (
  email: string,
  pass: string,
  username: string
) => {
  return await supabase.auth.signUp({
    email: email,
    password: pass,
    options: {
      data: {
        username,
      },
    },
  });
};

export const supabaseSignOut = async () => {
  return await supabase.auth.signOut();
};
