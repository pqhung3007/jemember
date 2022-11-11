import { createClient } from "@supabase/supabase-js";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_API || "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
  options
);
