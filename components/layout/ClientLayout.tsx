"use client";

import type React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/ui/scroll-to-top";
import RootProviders from "./Providers";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <RootProviders>
      <div className="min-h-screen flex flex-col">
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isAdminRoute && <Footer />}
        <ScrollToTop />
        {!isAdminRoute && <ChatWidget />}
      </div>
    </RootProviders>
  );
}
