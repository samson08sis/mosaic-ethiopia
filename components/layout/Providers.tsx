"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import LanguageProvider from "@/contexts/LanguageContext";
import ThemeProvider from "@/contexts/ThemeContext";
import { ModalProvider } from "@/contexts/ModalContext";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
