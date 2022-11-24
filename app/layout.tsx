import "styles/globals.css";

import { useCurrentUserSession } from "utils/supabase/auth/server";
import Nav from "components/layouts/Nav";
import SupabaseListener from "components/common/supabase-listener";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await useCurrentUserSession();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/js.png" />
        <title>Jemember</title>
        <meta property="og:image" content="/js_og.jpg" />
      </head>

      <body className="text-neutral-100">
        <Nav userID={user?.id} />
        <SupabaseListener accessToken={session?.access_token} />
        <div className="min-h-screen bg-neutral-900">{children}</div>
      </body>
    </html>
  );
}
