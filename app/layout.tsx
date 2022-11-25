import "styles/globals.css";

import Nav from "components/layouts/Nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/js.png" />
      </head>

      <body className="text-neutral-100">
        <Nav />
        <div className="min-h-screen bg-neutral-900">{children}</div>
      </body>
    </html>
  );
}
