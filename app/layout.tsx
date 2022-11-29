import "styles/globals.css";

import Nav from "components/layouts/Nav";
import SupabaseListener from "components/common/SupabaseListener";

import { useCurrentUserSession } from "utils/supabase/auth/server";
import Footer from "components/layouts/Footer";

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
        <meta property="og:image" content="/js_og.jpg" />
        <link rel="icon" type="image/x-icon" href="/js.png" />
      </head>

      <body className="text-neutral-100">
        <Nav userID={user?.id} />
        <SupabaseListener accessToken={session?.access_token} />
        <div className="min-h-screen bg-neutral-900">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
