import Nav from "components/layouts/Nav";

import "styles/globals.css";

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
        <title>Jemember</title>
        <meta property="og:image" content="/js_og.jpg" />
      </head>

      <body className="">
        <div className="min-h-screen bg-gray-900 text-blue-100">
          <Nav />
          <div className="pt-28">{children}</div>
        </div>
      </body>
    </html>
  );
}
