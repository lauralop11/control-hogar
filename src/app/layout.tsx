import Navbar from "@components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="w-full h-screen">
        <main className="m-5">{children}</main>
        <Navbar/>
      </body>
    </html>
  );
}
