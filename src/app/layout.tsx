import type {Metadata} from "next";
import { montserrat } from '../services/fonts'
import "./globals.css";
import { Header } from "@components";

export const metadata: Metadata = {
  title: 'Home Financial App',
  description: 'Administration of personal finances',
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="es" >
      <body className={`min-h-screen ${montserrat.className} antialiased`}>
        <Header/>
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}