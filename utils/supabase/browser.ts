import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "type";

export const supabaseBrowserClient = createBrowserSupabaseClient<Database>();
