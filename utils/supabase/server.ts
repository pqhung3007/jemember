import "server-only";

import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "type/database";

export const supabaseServerClient = () => createServerComponentSupabaseClient<Database>({
  headers,
  cookies,
});
