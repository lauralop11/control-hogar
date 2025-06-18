import type {Metadata} from "next";
import "@app-styles/globals.css";
import Header from "@components/layouts/Header";
import Footer from "@components/layouts/Footer";

export const metadata: Metadata = {
  title: 'Home Financial App',
  description: 'Administration of personal finances',
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen">
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}