import type {Metadata} from "next";
import "@app-styles/globals.css";
import Header from "@components/layouts/Header";

export const metadata: Metadata = {
  title: 'Home Financial App',
  description: 'Administration of personal finances',
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="es" >
      <body className="min-h-screen">
        <Header/>
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}