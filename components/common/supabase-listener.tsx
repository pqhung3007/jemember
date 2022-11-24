"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabaseBrowserClient } from "utils/supabase/browser";

export default function SupabaseListener({
  accessToken,
}: {
  accessToken: string | undefined;
}) {
  const router = useRouter();

  useEffect(() => {
    supabaseBrowserClient.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [accessToken]);

  return null;
}
