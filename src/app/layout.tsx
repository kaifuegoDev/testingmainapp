import type { Metadata } from "next";
import { Sora, Kanit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Zigzec | Gaming Platform",
  description: "Experience the ultimate gaming arena.",
};

import OneSignalInitializer from "@/components/OneSignalInitializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${kanit.variable}`}>
      <body className="antialiased font-sora" suppressHydrationWarning>
        <OneSignalInitializer />
        {children}
      </body>
    </html>
  );
}
