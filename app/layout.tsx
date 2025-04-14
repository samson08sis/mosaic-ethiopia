import type React from "react";
import type { Metadata } from "next";
import { Inter, Arizonia } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/contexts/ThemeContext";
import LanguageProvider from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";
import ScrollToTop from "@/components/ui/scroll-to-top";
import ChatWidget from "@/components/chat/ChatWidget";
import { AuthProvider } from "@/contexts/AuthContext";

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
  generator: "",
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
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
                <ScrollToTop />
                <ChatWidget />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
