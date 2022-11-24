import ProfilePage from "./ProfilePage";
import { useCurrentUserMetadata, useCurrentUserSession } from "utils/supabase/auth/server";

import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Profile() {
  const { user } = await useCurrentUserSession();

  if (!user) {
    redirect("/login");
  }

  const userData = await useCurrentUserMetadata(user);

  return <ProfilePage user={user} userMetaData={userData} />;
}
