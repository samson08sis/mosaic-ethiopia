"use client";

import type React from "react";
import ThemeProvider from "@/contexts/ThemeContext";
import LanguageProvider from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import ChatWidget from "@/components/chat/ChatWidget";
import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {!isAdminRoute && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!isAdminRoute && <Footer />}
            <ScrollToTop />
            {!isAdminRoute && <ChatWidget />}
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
