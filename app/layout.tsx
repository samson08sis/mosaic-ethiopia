import type React from "react";
import type { Metadata } from "next";
import { Inter, Arizonia } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const arizonia = Arizonia({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-arizonia",
});

export const metadata: Metadata = {
  title: "Mosaic Ethiopia - Your Ultimate Travel Companion",
  description:
    "Discover amazing places, book customized tour packages, and create unforgettable travel memories with Mosaic Ethiopia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${arizonia.variable}`}>
      <body className={`${inter.className} bg-neutral-50 dark:bg-gray-900`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
