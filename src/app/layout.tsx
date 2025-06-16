import type {Metadata} from "next";
import Header from "@components/Header";
import "./globals.css";

export const metadata: Metadata ={
  title: "Cuentas App",
  description: "App create by next app",
}

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="w-full h-screen relative">
        <Header/>
        <main className="my-3 pb-[80px]">{children}</main>
   
      </body>
    </html>
  );
}
