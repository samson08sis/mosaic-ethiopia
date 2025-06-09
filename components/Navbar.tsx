"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { ThemeSlider } from "./ui/ThemeSlider";

const navItems = {
  links: [
    { name: "home", href: "/" },
    { name: "destinations", href: "/destinations" },
    { name: "packages", href: "/packages" },
    { name: "about", href: "/about" },
    { name: "contact", href: "/contact" },
  ],
  langs: [
    { name: "English", code: "en" },
    { name: "Español", code: "es" },
    { name: "Français", code: "fr" },
  ],
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, translations } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Determine navbar background based on scroll position
  const navbarBackground =
    scrollPosition > 50
      ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
      : "backdrop-blur-sm dark:backdrop-blur-0 bg-white/30 dark:bg-transparent";

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 print-section ${navbarBackground}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 font-arizonia text-3xl text-primary dark:text-primary-400">
              MosaicEthiopia
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-400 ${
                    pathname === "/" ? "text-primary dark:text-primary-400" : ""
                  }`}>
                  {(translations as any)[link.name] || link.name}
                </Link>
              ))}

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={toggleLanguageMenu}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-400">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="uppercase">{language}</span>
                </button>

                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    {navItems.langs.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          toggleLanguageMenu();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeSlider isMobile={isMenuOpen} />
              {/* Login Button or Profile Dropdown */}
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <button
                  onClick={openLoginModal}
                  className="ml-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                  {translations.login || "Login"}
                </button>
              )}
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
              {navItems.links.map((link) => (
                <Link
                  onClick={toggleMenu}
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                  {link.name}
                </Link>
              ))}

              {/* Theme Toggle in Mobile Menu */}
              <div className="flex items-center px-3 py-2">
                <ThemeSlider isMobile={isMenuOpen} />
              </div>

              {/* Language Options in Mobile Menu */}
              <div className="px-3 py-2">
                <div className="text-gray-900 dark:text-white mb-2">
                  {translations.language || "Language"}
                </div>
                <div className="flex space-x-4">
                  {navItems.langs.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        toggleMenu();
                      }}
                      className={`text-sm ${
                        language === lang.code
                          ? "font-bold text-primary dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Button or Profile in Mobile Menu */}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <Link
                    href="/profile"
                    className="block w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                    {translations.myProfile || "My Profile"}
                  </Link>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="block w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                    {translations.login || "Login"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
