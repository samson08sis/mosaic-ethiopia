"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Language translations
const translationsData = {
  en: {
    home: "Home",
    destinations: "Destinations",
    exploreWorld: "Explore the World",
    discoverPlaces: "Discover amazing places with us",
    bookNow: "Book Now",
    learnMore: "Learn More",
  },
  es: {
    home: "Inicio",
    destinations: "Destinos",
    exploreWorld: "Explora el Mundo",
    discoverPlaces: "Descubre lugares increíbles con nosotros",
    bookNow: "Reservar Ahora",
    learnMore: "Saber Más",
  },
  fr: {
    home: "Accueil",
    destinations: "Destinations",
    exploreWorld: "Explorez le Monde",
    discoverPlaces: "Découvrez des endroits incroyables avec nous",
    bookNow: "Réserver Maintenant",
    learnMore: "En Savoir Plus",
  },
}

// Create context
const LanguageContext = createContext(undefined)

// Custom hook for using the language
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Language provider component
export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState(translationsData.en)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && translationsData[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    setTranslations(translationsData[language] || translationsData.en)
    localStorage.setItem("language", language)
  }, [language])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>{children}</LanguageContext.Provider>
  )
}

