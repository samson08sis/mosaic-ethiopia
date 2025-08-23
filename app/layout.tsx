import type React from "react";
import type { Metadata } from "next";
import { Inter, Arizonia } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Analytics } from "@vercel/analytics/next";

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
  title: {
    default: "Mosaic Ethiopia Tour - Your Ultimate Travel Companion",
    template: "%s - Mosaic Tour",
  },
  description:
    "Unleash your wanderlust and design the perfect adventure! Mosaic Ethiopia lets you book tailor-made tour packages, handpick breathtaking destinations, and connect instantly with our AI-powered travel assistant for live chat support. Whether you're chasing ancient history, vibrant culture, or scenic landscapes, we make it easy to plan, personalize, and experience unforgettable journeys across Ethiopia.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning //Uncomment later
      className={`${inter.variable} ${arizonia.variable}`}>
      <body className={`${inter.className} bg-neutral-50 dark:bg-gray-900`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
