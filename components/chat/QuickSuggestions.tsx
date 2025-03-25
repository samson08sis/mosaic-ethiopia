"use client";

import { useRef, useEffect, useState } from "react";

type QuickSuggestionsProps = {
  isOpen: boolean;
  showFaq: boolean;
  onSuggestionClick: (suggestion: string) => void;
};

export default function QuickSuggestions({
  isOpen,
  showFaq,
  onSuggestionClick,
}: QuickSuggestionsProps) {
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Set up auto-scrolling functionality
  useEffect(() => {
    if (!isOpen || showFaq) return;

    const scrollContainer = suggestionsRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    const startAutoScroll = () => {
      if (isManualScrolling) return;

      scrollInterval = setInterval(() => {
        if (scrollContainer && !isManualScrolling) {
          // Increment scroll position
          scrollContainer.scrollLeft += 1;

          // If we've scrolled to the end, reset to beginning
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 30);
    };

    startAutoScroll();

    const handleManualScroll = (e: MouseEvent | TouchEvent | WheelEvent) => {
      e.preventDefault();
      if (suggestionsRef.current)
        suggestionsRef.current.scrollLeft += e.deltaY / 3;

      if (scrollInterval) {
        clearInterval(scrollInterval);
      }

      setIsManualScrolling(true);

      // Resume auto-scrolling after a pause
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }

      pauseTimeout = setTimeout(() => {
        setIsManualScrolling(false);
        startAutoScroll();
      }, 2000); // Resume after 2 seconds of inactivity
    };

    scrollContainer.addEventListener("mousedown", handleManualScroll);
    scrollContainer.addEventListener("touchstart", handleManualScroll);
    scrollContainer.addEventListener("wheel", handleManualScroll, {
      passive: false,
    });

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);

      scrollContainer.removeEventListener("mousedown", handleManualScroll);
      scrollContainer.removeEventListener("touchstart", handleManualScroll);
      scrollContainer.removeEventListener("wheel", handleManualScroll);
    };
  }, [isOpen, showFaq, isManualScrolling]);

  // const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (suggestionsRef.current) {
  //     suggestionsRef.current.scrollLeft += e.deltaY;
  //   }
  // };

  const suggestions = [
    "Best time to visit",
    "Popular destinations",
    "Tour costs",
    "Ethiopian food",
    "Coffee ceremony",
    "Safety tips",
    "Visa requirements",
    "Local customs",
    "Weather conditions",
  ];

  return (
    <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div
        ref={suggestionsRef}
        // onWheel={handleWheel}
        className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors whitespace-nowrap flex-shrink-0">
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
