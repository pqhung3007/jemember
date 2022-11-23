import "styles/globals.css";

import {
  useCurrentUserMetadata,
  useCurrentUserSession,
} from "utils/supabase/auth/server";
import Nav from "components/layouts/Nav";
import SupabaseListener from "components/common/supabase-listener";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await useCurrentUserSession();
  const userMetaData = user ? await useCurrentUserMetadata(user) : null;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/js.png" />
        <title>Jemember</title>
        <meta property="og:image" content="./js_og.jpg" />
      </head>

      <body className="text-slate-100">
        <Nav user={userMetaData} />
        <SupabaseListener accessToken={session?.access_token} />
        <div className="min-h-screen bg-gray-900">{children}</div>
      </body>
    </html>
  );
}
