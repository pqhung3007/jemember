"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "supabase";

export default function SupabaseListener({
  accessToken,
}: {
  accessToken: string | undefined;
}) {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [accessToken]);

  return null;
}
