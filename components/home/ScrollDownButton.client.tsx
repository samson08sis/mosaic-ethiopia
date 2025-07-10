"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollDownButton() {
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY <= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 1.1,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToContent}
      className={`${
        isFixed ? "fixed" : "absolute"
      } bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce z-50`}
      aria-label="Scroll down">
      <ChevronDown className="h-10 w-10" />
    </button>
  );
}
