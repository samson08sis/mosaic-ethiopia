"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import LanguageProvider from "@/contexts/LanguageContext";
import ThemeProvider from "@/contexts/ThemeContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { NavigationTransitionProvider } from "@/contexts/NavigationTransitionContext";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationTransitionProvider>
          <ModalProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ModalProvider>
        </NavigationTransitionProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
