"use client";
import { ArrowUp } from "lucide-react";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-24 animate-pulse right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-rose-700 text-white w-12 h-12 rounded-full flex items-center justify-center focus:outline-none">
          <ArrowUp />
        </button>
      )}
    </div>
  );
}
