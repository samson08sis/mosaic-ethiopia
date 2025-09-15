"use client";

import { Messages } from "@/types/intl";
import { createContext, ReactNode, useContext } from "react";

const TranslationContext = createContext<Messages | null>(null);

export const TranslationProvider = ({
  messages,
  children,
}: {
  messages: Messages;
  children: ReactNode;
}) => (
  <TranslationContext.Provider value={messages}>
    {children}
  </TranslationContext.Provider>
);

export const useTranslation = () => useContext(TranslationContext);
