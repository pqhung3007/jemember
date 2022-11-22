import "styles/globals.css";

export default function SingupLayout({
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
        <meta property="og:image" content="./js_og.jpg" />
      </head>

      <body>
        <div className="min-h-screen bg-gray-900 text-slate-100">
          {children}
        </div>
      </body>
    </html>
  );
}
