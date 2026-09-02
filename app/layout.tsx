import type { Metadata } from "next";
import { SiteProvider } from "./components/SiteProvider";
import "./globals.css";

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
      <body>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
