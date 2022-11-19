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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/js.png" />
        <title>Jemember</title>
        <meta
          property="og:image"
          content="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/298104449_1425903294577248_8564760957477181585_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8631f5&_nc_ohc=1u0_CYlRgMwAX-16tpq&tn=_mo5wqSMKg1RfZf4&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBLN_vgDRecti76wdLYbx4swGscjpAWCKVqpg9AClmhnA&oe=63738B30"
        />
        <meta
          property="og:description"
          content="Ứng dụng học flashcard được tạo ra bởi các thành viên JSClub"
        />
      </head>

      <body className="bg-black">
        <div className="min-h-screen bg-gray-900/60 text-gray-100">
          <Nav />
          <div className="pt-28">{children}</div>
        </div>
      </body>
    </html>
  );
}
