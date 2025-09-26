"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemsPerView?: number;
  gap?: number;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
}

export default function Carousel({
  children,
  className,
  itemsPerView = 1,
  gap = 16,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsCount = React.Children.count(children);
  const [itemsPerViewState, setItemsPerViewState] = useState(itemsPerView);

  const maxIndex = Math.max(0, Math.ceil(itemsCount / itemsPerViewState) - 1);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;

      if (containerWidth < 640) setItemsPerViewState(1);
      else if (containerWidth < 1024)
        setItemsPerViewState(Math.min(2, itemsPerView));
      else setItemsPerViewState(itemsPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, maxIndex]);

  const goTo = (index: number) => {
    if (index < 0) setCurrentIndex(loop ? maxIndex : 0);
    else if (index > maxIndex) setCurrentIndex(loop ? 0 : maxIndex);
    else setCurrentIndex(index);
  };

  const goToNext = () => goTo(currentIndex + 1);
  const goToPrev = () => goTo(currentIndex - 1);

  // Calculate scroll position
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const itemWidth = (container.clientWidth + gap) / itemsPerViewState;
    const scrollPosition = currentIndex * itemWidth * itemsPerViewState;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [currentIndex, itemsPerViewState, gap]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: `calc(${100 / itemsPerViewState}% - ${
            (gap * (itemsPerViewState - 1)) / itemsPerViewState
          }px)`,
          gap: `${gap}px`,
        }}>
        {React.Children.map(children, (child, index) => (
          <div className="snap-start" key={index}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && itemsCount > itemsPerViewState && (
        <>
          <button
            onClick={goToPrev}
            className={cn(
              "absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg z-10",
              currentIndex === 0 && !loop && "opacity-50 cursor-not-allowed"
            )}
            disabled={currentIndex === 0 && !loop}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg z-10",
              currentIndex === maxIndex &&
                !loop &&
                "opacity-50 cursor-not-allowed"
            )}
            disabled={currentIndex === maxIndex && !loop}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && itemsCount > itemsPerViewState && (
        <div className="flex justify-center items-end mt-1 mb-4 gap-2 absolute inset-0">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index
                  ? "bg-blue-600 w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
