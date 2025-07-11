"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import LanguageProvider from "@/contexts/LanguageContext";
import ThemeProvider from "@/contexts/ThemeContext";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
