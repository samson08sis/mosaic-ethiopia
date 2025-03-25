"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

// Language translations
const translationsData = {
  en: {
    home: "Home",
    destinations: "Destinations",
    exploreWorld: "Explore the World",
    discoverPlaces: "Discover amazing places with us",
    bookNow: "Book Now",
    learnMore: "Learn More",
    popularDestinations: "Popular Destinations",
    customizablePackages: "Customizable Packages",
    bookYourTrip: "Book Your Trip",
    testimonials: "What Our Customers Say",
  },
  es: {
    home: "Inicio",
    destinations: "Destinos",
    exploreWorld: "Explora el Mundo",
    discoverPlaces: "Descubre lugares increíbles con nosotros",
    bookNow: "Reservar Ahora",
    learnMore: "Saber Más",
    popularDestinations: "Destinos Populares",
    customizablePackages: "Paquetes Personalizables",
    bookYourTrip: "Reserva Tu Viaje",
    testimonials: "Lo Que Dicen Nuestros Clientes",
  },
  fr: {
    home: "Accueil",
    destinations: "Destinations",
    exploreWorld: "Explorez le Monde",
    discoverPlaces: "Découvrez des endroits incroyables avec nous",
    bookNow: "Réserver Maintenant",
    learnMore: "En Savoir Plus",
    popularDestinations: "Destinations Populaires",
    customizablePackages: "Forfaits Personnalisables",
    bookYourTrip: "Réservez Votre Voyage",
    testimonials: "Ce Que Disent Nos Clients",
  },
}

type Translations = typeof translationsData.en
type LanguageContextType = {
  language: string
  translations: Translations
  changeLanguage: (lang: string) => void
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Custom hook for using the language
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Language provider component
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState<Translations>(translationsData.en)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && savedLanguage in translationsData) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    setTranslations(translationsData[language as keyof typeof translationsData] || translationsData.en)
    localStorage.setItem("language", language)
  }, [language, mounted])

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>{children}</LanguageContext.Provider>
  )
}

