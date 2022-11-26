import ProfilePage from "./ProfilePage";
import { useCurrentUserMetadata, useCurrentUserSession, authStatusOrRedirect } from "utils/supabase/auth/server";

import { User } from "@supabase/supabase-js";

export const revalidate = 0;

export default async function Profile() {
  await authStatusOrRedirect(true, "/login");

  const { user } = await useCurrentUserSession();
  const userData = await useCurrentUserMetadata(user as User);

  return <ProfilePage user={user} userMetaData={userData} />;
}
