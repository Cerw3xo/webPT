import type { Metadata } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import { SiteProvider } from "./components/SiteProvider";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Matej Červenka — osobní trenér Zlín",
  description: "Osobní silový a kondiční trénink v Zlíně pro začátečníky a mírně pokročilé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${archivo.variable} ${interTight.variable}`}>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
