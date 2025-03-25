"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";

export default function Navbar({ scrollPosition }) {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  // Determine navbar background based on scroll position
  const navbarBackground =
    scrollPosition > 50
      ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
      : "bg-transparent";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navbarBackground}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-2xl text-primary-600 dark:text-primary-400">
            MosaicEthiopia
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </a>
            <a
              href="#destinations"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
              Destinations
            </a>
            <a
              href="#packages"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
              Packages
            </a>
            <a
              href="#booking"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
              Booking
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                <Globe className="h-4 w-4 mr-1" />
                <span className="uppercase">{language}</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      changeLanguage("en");
                      toggleLanguageMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    English
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("es");
                      toggleLanguageMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Español
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("fr");
                      toggleLanguageMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Français
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme">
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Login Button */}
            <a
              href="#login"
              className="ml-4 px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-expanded="false">
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4">
          <div className="space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              Home
            </a>
            <a
              href="#destinations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              Destinations
            </a>
            <a
              href="#packages"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              Packages
            </a>
            <a
              href="#booking"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              Booking
            </a>

            {/* Theme Toggle in Mobile Menu */}
            <div className="flex items-center px-3 py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center text-gray-900 dark:text-white">
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-gray-700 mr-2" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>

            {/* Language Options in Mobile Menu */}
            <div className="px-3 py-2">
              <div className="text-gray-900 dark:text-white mb-2">Language</div>
              <div className="flex space-x-4">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`text-sm ${
                    language === "en"
                      ? "font-bold text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                  English
                </button>
                <button
                  onClick={() => changeLanguage("es")}
                  className={`text-sm ${
                    language === "es"
                      ? "font-bold text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                  Español
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`text-sm ${
                    language === "fr"
                      ? "font-bold text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                  Français
                </button>
              </div>
            </div>

            {/* Login Button in Mobile Menu */}
            <div className="px-3 py-2">
              <a
                href="#login"
                className="block w-full px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
