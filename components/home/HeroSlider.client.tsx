"use client";

import { HeroSlideType } from "@/types/types";
import { useState, useEffect, useRef } from "react";

export default function HeroSlider({
  slides,
  initialSlide,
}: {
  slides: HeroSlideType[];
  initialSlide: number;
}) {
  const [isFixed, setIsFixed] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const watchedSlides = useRef<number[]>([initialSlide]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight && isFixed) {
        setIsFixed(false);
      } else if (window.scrollY <= window.innerHeight && !isFixed) {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  const nextSlide = () => {
    if (slides.length <= 9) return;

    let randomIndex = Math.floor(Math.random() * slides.length);
    while (watchedSlides.current.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * slides.length);
    }
    if (watchedSlides.current.length < 10) {
      watchedSlides.current = [...watchedSlides.current, randomIndex];
    } else {
      const [, ...afterShift] = watchedSlides.current;
      watchedSlides.current = [...afterShift, randomIndex];
    }

    setCurrentSlide(randomIndex);
  };

  useEffect(() => {
    if (slides.length <= 9) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {Array.isArray(slides) &&
        slides.map((slide, index) => (
          <div
            key={index}
            className={`h-screen w-full bg-cover bg-center transition-opacity duration-1000 ${
              isFixed ? "fixed top-0 left-0" : "absolute"
            } ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none transition-opacity"
            } top-0 left-0`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        ))}
    </>
  );
}
