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
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jemember" />
        <meta
          property="og:description"
          content="Jemember is a flashcard app that helps you learn anything."
        />
        <meta property="og:url" content="https://jemember.jsclub.tech/" />
        <meta property="og:site_name" content="Jemember" />
        <meta property="og:image" content="/js_og.jpg" />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="270" />
        <title>Jemember</title>
      </head>

      <body className="text-neutral-100">
        <Nav userID={user?.id} />
        <SupabaseListener accessToken={session?.access_token} />
        <div className="min-h-screen bg-neutral-900">{children}</div>
      </body>
    </html>
  );
}
