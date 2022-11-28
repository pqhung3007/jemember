import ProfilePage from "./ProfilePage";
import { useCurrentUserSession, authStatusOrRedirect } from "utils/supabase/auth/server";

export const revalidate = 0;

export default async function Profile() {
  await authStatusOrRedirect(true, "/login");

  const { user } = await useCurrentUserSession();

  return <ProfilePage user={user} />;
}
