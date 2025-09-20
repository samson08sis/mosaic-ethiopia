"use client";

import type React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/ui/scroll-to-top";
import RootProviders from "./Providers";
import ModalContainer from "./ModalContainer";
import ScrollDownButton from "../home/ScrollDownButton.client";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const segments = pathname?.split("/") ?? [];

  const isAdminRoute = segments[2] === "admin";
  console.log(segments);

  return (
    <RootProviders>
      <div className="min-h-screen flex flex-col">
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow min-h-screen">{children}</main>
        {!isAdminRoute && <Footer />}
        {/* Scroll Buttons */}
        <ScrollToTop />
        {!isAdminRoute && segments.length === 2 && <ScrollDownButton />}
        {!isAdminRoute && <ChatWidget />}
        <ModalContainer />
      </div>
    </RootProviders>
  );
}
