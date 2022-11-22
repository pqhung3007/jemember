"use client";

import { useEffect, useState } from "react";
import { UserProps } from "types";
import { supabaseGetCurrentUserMetadata } from "utils";
import ProfilePage from "./ProfilePage";

export default function Profile() {
  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    supabaseGetCurrentUserMetadata().then((userMeta) => {
      if (userMeta) {
        setUser(userMeta);
      }
    });
  }, []);

  return <ProfilePage user={user} />;
}
