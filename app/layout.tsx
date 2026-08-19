import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MT — Strength & Performance Coaching",
  description: "Silový, kondičný a hybridný tréning pre telo, ktoré dokáže viac.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
