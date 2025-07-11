import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const langs = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Français", code: "fr" },
];

type LanguageMenuProps = {
  isMobile: boolean;
  onLanguageChange?: () => void;
};

export default function LanguageMenu({
  isMobile,
  onLanguageChange,
}: LanguageMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, translations, changeLanguage } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    isMobile ? onLanguageChange!() : toggleLanguageMenu();
  };

  return (
    <>
      {isMobile ? (
        <div className="px-3 py-2">
          <div className="text-gray-900 dark:text-white mb-2">
            <Globe className="h-6 w-6 mr-2 mb-1 inline-block" />
            {translations.language || "Language"}
          </div>
          <div className="flex space-x-4">
            {langs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
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
      ) : (
        <div ref={modalRef} className="relative">
          <button
            onClick={toggleLanguageMenu}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            <Globe className="h-4 w-4 mr-1" />
            <span className="uppercase">{language}</span>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              {langs.map((lang) => (
                <>
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {lang.name}
                  </button>
                  <div className=" ml-0 mr-2 p-0 border-0 border-t " />
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
