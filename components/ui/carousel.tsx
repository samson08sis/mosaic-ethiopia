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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsCount = React.Children.count(children);
  const maxIndex = Math.max(0, Math.ceil(itemsCount / itemsPerView) - 1);

  // Calculate items per view based on screen size
  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCurrentItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCurrentItemsPerView(Math.min(2, itemsPerView));
      } else {
        setCurrentItemsPerView(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [activeIndex, autoPlay, autoPlayInterval, maxIndex]);

  const goToNext = () => {
    if (activeIndex < maxIndex) {
      setActiveIndex(activeIndex + 1);
    } else if (loop) {
      setActiveIndex(0);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (loop) {
      setActiveIndex(maxIndex);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ("touches" in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    let currentX: number;
    if ("touches" in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }

    const diff = currentX - startX;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const maxTranslate = containerWidth * 0.2; // 20% of container width

    // Limit translation to a percentage of container width
    const boundedTranslate = Math.max(
      Math.min(diff, maxTranslate),
      -maxTranslate
    );
    setTranslateX(boundedTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // If dragged more than 20% of the container width, change slide
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const threshold = containerWidth * 0.2;

    if (translateX > threshold) {
      goToPrev();
    } else if (translateX < -threshold) {
      goToNext();
    }

    setTranslateX(0);
  };

  const getItemStyle = (index: number) => {
    const itemWidth = `calc(${100 / currentItemsPerView}% - ${
      (gap * (currentItemsPerView - 1)) / currentItemsPerView
    }px)`;
    return {
      width: itemWidth,
      marginRight: index < itemsCount - 1 ? `${gap}px` : 0,
    };
  };

  const getTrackStyle = () => {
    const baseTranslate = -activeIndex * (100 / currentItemsPerView);
    const dragOffset = isDragging
      ? (translateX / (containerRef.current?.offsetWidth || 1)) * 100
      : 0;

    return {
      transform: `translateX(calc(${baseTranslate}% + ${dragOffset}%))`,
      transition: isDragging ? "none" : "transform 0.5s ease-in-out",
      display: "flex",
    };
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      ref={containerRef}>
      {/* Carousel Track */}
      <div
        className="w-full"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}>
        <div style={getTrackStyle()}>
          {React.Children.map(children, (child, index) => (
            <div style={getItemStyle(index)} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className={cn(
              "absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 focus:outline-none z-10 transition-opacity",
              { "opacity-50 cursor-not-allowed": activeIndex === 0 && !loop }
            )}
            disabled={activeIndex === 0 && !loop}
            aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className={cn(
              "absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 focus:outline-none z-10 transition-opacity",
              {
                "opacity-50 cursor-not-allowed":
                  activeIndex === maxIndex && !loop,
              }
            )}
            disabled={activeIndex === maxIndex && !loop}
            aria-label="Next slide">
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && maxIndex > 0 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                activeIndex === index
                  ? "bg-primary-600 w-3 h-3"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
