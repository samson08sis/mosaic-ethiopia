"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "../ProfileDropdown";
import { ThemeSlider } from "../ui/ThemeSlider";
import LanguageMenu from "../LanguageMenu";
import { useNavigationTransition } from "@/hooks/navigationTransition";
import { paths } from "@/data/paths/data";
import { useModal } from "@/contexts/ModalContext";
import { useTranslation } from "@/contexts/IntlContext";

const navItems = paths;

export default function Navbar() {
  // const { t } = useLanguage();
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const { isTransitioning, handleNavigate } = useNavigationTransition();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated || pathname === "/forgot-password") {
      closeModal();
      setIsMenuOpen(false);
    }
  }, [isAuthenticated, pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    path !== pathname && handleNavigate();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setIsMenuOpen(false);
    openModal("login");
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  // Determine navbar background based on scroll position
  const navbarBackground =
    scrollPosition > 50
      ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
      : "backdrop-blur-sm bg-white/30 dark:bg-gray-900/30";

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 print-section ${navbarBackground}`}>
        {isTransitioning && (
          <div className="absolute top-0 left-0 h-px w-full overflow-hidden">
            <div className="loading-bar"></div>
          </div>
        )}
        <div className="flex justify-between items-center p-2">
          <div className="lg:container flex justify-start space-x-8">
            {/* Logo */}
            <Link
              href={isAuthenticated ? "/dashboard" : "/"}
              className="flex-shrink-0 font-arizonia text-3xl text-primary dark:text-primary-400 focus:outline-none focus:ring-0">
              MosaicEthiopia
            </Link>

            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative group px-3 py-2 text-sm font-medium transition-colors${
                    pathname === link.href
                      ? "text-primary dark:text-primary-400"
                      : "text-gray-900 dark:text-white"
                  } hover:text-primary dark:hover:text-primary-400`}
                  data-active={pathname === link.href}>
                  {(t as any)[link.name] || link.name}
                  <span className="underline-slide" />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Language Selector */}
            <LanguageMenu
              currentLocale={pathname!.split("/")[1]}
              isMobile={isMenuOpen}
            />

            {/* Theme Toggle */}
            <ThemeSlider isMobile={isMenuOpen} />
            {/* Login Button or Profile Dropdown */}
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <button
                onClick={openLoginModal}
                className="ml-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                {t!.login || "Login"}
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

        {/* Mobile Menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 p-4">
            <div className="space-y-1">
              {navItems.map((link) => (
                <Link
                  onClick={toggleMenu}
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span className="flex flex-row">
                    <link.icon className="mr-4" />
                    {(t as any)[link.name] ||
                      link.name
                        .charAt(0)
                        .toUpperCase()
                        .concat(link.name.slice(1))}
                  </span>
                </Link>
              ))}

              {/* Theme Toggle in Mobile Menu */}
              <div className="flex items-center px-3 py-2">
                <ThemeSlider isMobile={isMenuOpen} />
              </div>

              {/* Language Options in Mobile Menu */}
              <LanguageMenu
                isMobile={true}
                currentLocale={pathname!.split("/")[0]}
                onLanguageChange={toggleMenu}
              />

              {/* Buttons and Links in Mobile Menu */}
              <div className="px-3 py-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                      {t!.dashboard || "Dashboard"}
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mt-2 w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                      {t!.myProfile || "My Profile"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block mt-2 w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                      {t!.signOut || "Sign Out"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="block w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-center">
                    {t!.login || "Login"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
