import type {Metadata} from "next";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import "./globals.css";

export const medata: Metadata ={
  title: "Cuentas App",
  description: "App by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="w-full h-screen relative">
        <Header/>
        <main className="m-5">{children}</main>
        <Navbar/>
      </body>
    </html>
  );
}
