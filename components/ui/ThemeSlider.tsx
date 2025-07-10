import { useState } from "react";
import { Moon, Sun, Computer } from "lucide-react"; // or your icon library
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function ThemeSlider({ isMobile }: { isMobile: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { translations } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);

  const getNextTheme = () => {
    if (theme === "dark") return "system";
    if (theme === "light") return "dark";
    return "light"; // system → light
  };

  const getThemeIcon = (theme: "dark" | "light" | "system") => {
    switch (theme) {
      case "dark":
        return <Moon className="h-4 w-4 text-blue-400" />;
      case "light":
        return <Sun className="h-4 w-4 text-yellow-400" />;
      default:
        return <Computer className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative w-16 h-8 mr-2">
        {/* Track */}
        <div
          className={`absolute inset-0 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
            theme === "dark"
              ? "bg-gray-800"
              : theme === "light"
              ? "bg-yellow-100"
              : "bg-gray-200"
          }`}
          onClick={toggleTheme}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}>
          {/* Current Theme Thumb */}
          <div
            className={`absolute z-10 h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform ${
              theme === "dark"
                ? "translate-x-8"
                : theme === "light"
                ? "translate-x-0"
                : "translate-x-4"
            } ${isDragging ? "scale-110" : ""}`}>
            {getThemeIcon(theme)}
          </div>

          {/* Next Theme Indicator (opposite side) */}
          <div
            className={`absolute flex items-center ${
              theme === "dark"
                ? "left-1"
                : theme === "light"
                ? "right-1"
                : theme === "system" && "left-1"
            }`}>
            {getThemeIcon(getNextTheme())}
          </div>
        </div>
      </div>
      {isMobile && (
        <span>
          {theme === "dark"
            ? translations.darkMode || "Dark Mode"
            : theme === "light"
            ? translations.lightMode
            : translations.systemTheme || "System Theme"}
        </span>
      )}
    </div>
  );
}
