"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const { translations } = useLanguage()
  const [isFixed, setIsFixed] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Once the user scrolls past 100vh, un-fix the background
      if (window.scrollY > window.innerHeight && isFixed) {
        setIsFixed(false)
      } else if (window.scrollY <= window.innerHeight && !isFixed) {
        setIsFixed(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isFixed])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative h-screen">
      {/* Hero Background Image - Initially fixed, then becomes part of the scroll */}
      <div
        className={`h-screen w-full bg-cover bg-center ${isFixed ? "fixed top-0 left-0" : "absolute"}`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80')",
          zIndex: -1,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white relative">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          {translations.exploreWorld || "Explore the World"}
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mb-8">
          {translations.discoverPlaces || "Discover amazing places with us"}
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#booking"
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {translations.bookNow || "Book Now"}
          </a>
          <a
            href="#packages"
            className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-lg backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {translations.learnMore || "Learn More"}
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-10 w-10" />
      </button>
    </div>
  )
}

