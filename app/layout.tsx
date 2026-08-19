import type { Metadata } from "next";
import { Antonio, Inter } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MT — Strength & Performance Coaching",
  description: "Silový, kondiční a hybridní trénink pro tělo, které zvládne víc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${antonio.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
