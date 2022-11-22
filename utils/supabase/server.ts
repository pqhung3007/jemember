
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "types/database.types";

export const supabaseServerClient = () => createServerComponentSupabaseClient<Database>({
  headers,
  cookies,
});
