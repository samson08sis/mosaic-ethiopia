"use client";

import translationsData from "@/data/translations/data";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

type Translations = typeof translationsData.en;
type LanguageContextType = {
  language: string;
  translations: Translations;
  changeLanguage: (lang: string) => void;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Custom hook for using the language
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Language provider component
export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState<Translations>(
    translationsData.en
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage in translationsData) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    setTranslations(
      translationsData[language as keyof typeof translationsData] ||
        translationsData.en
    );
    localStorage.setItem("language", language);
  }, [language, mounted]);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
