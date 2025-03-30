"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Play, X } from "lucide-react";
import Link from "next/link";
import { set } from "react-hook-form";

const slides = [
  {
    id: 1,
    image: "/lalibela-bete-giorgis.jpg",
    alt: "",
    description:
      "Discover Ethiopia's rock-hewn churches, a UNESCO World Heritage site.",
  },
  {
    id: 2,
    image: "/simien-mountains.jpg",
    alt: "",
    title: "Experience the Simien Mountains",
    description:
      "Trek through breathtaking landscapes and encounter unique wildlife.",
  },
  {
    id: 3,
    image: "/addis-ababa.jpg",
    alt: "",
    title: "Discover Addis Ababa",
    description:
      "Immerse yourself in the vibrant culture of Ethiopia's capital city.",
  },
  {
    id: 4,
    image: "/the-danakil-rift.jpg",
    alt: "",
    title: "Visit the Danakil Depression",
    description:
      "Explore one of the hottest and most alien landscapes on Earth.",
  },
  {
    id: 5,
    image: "/sof-omar-cave.jpg",
    alt: "",
    title: "Sof Umar Cave",
    Description: "Wander through the most uniquely natural cave.",
  },
  {
    id: "6",
    image: "/afar-1.jpg",
    alt: "",
  },
  {
    id: "7",
    image: "/afar-2.jpg",
    alt: "",
  },
  {
    id: "8",
    image: "/coffee-1.jpg",
    alt: "",
  },
  {
    id: "9",
    image: "/coffee-2.jpg",
    alt: "",
  },
  {
    id: "10",
    image: "/culture-1.jpg",
    alt: "",
  },
  {
    id: "",
    image: "/culture-2.jpg",
    alt: "",
  },
  {
    id: "11",
    image: "/gondar-fasil.png",
    alt: "",
  },
  {
    id: "12",
    image: "nile-1.jpg",
    alt: "",
  },
  {
    id: "13",
    image: "/nile-2.jpg",
    alt: "",
  },
  {
    id: "14",
    image: "/bg-1.jpg",
    alt: "",
  },
  {
    id: "15",
    image: "/omo-2.jpg",
    alt: "",
  },
  {
    id: "16",
    image: "/omo-3.jpg",
    alt: "",
  },
  {
    id: "17",
    image: "/omo-4.jpg",
    alt: "",
  },
  {
    id: "18",
    image: "/omo-5.jpg",
    alt: "",
  },
  {
    id: "19",
    image: "/bg-11.jpg",
    alt: "",
  },
  {
    id: "20",
    image: "/afar-danakil.jpg",
    alt: "",
  },
  {
    id: "21",
    image: "/nile-3.jpg",
    alt: "",
  },
  {
    id: "22",
    image: "/aksum.jpg",
    alt: "",
  },
  {
    id: "23",
    image: "/bale-1.jpg",
    alt: "",
  },
  {
    id: "24",
    image: "/bale-2.jpg",
    alt: "",
  },
  {
    id: "25",
    image: "/bale-3.jpg",
    alt: "",
  },
];

export default function Hero() {
  const { translations } = useLanguage();
  const [isFixed, setIsFixed] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const watchedSlides = useRef<number[]>([0]);

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

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section with Video Button */}
      <div className="relative h-screen">
        {/* Hero Background Image */}
        {slides.map((slide, index) => (
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

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative">
          <div className="h-full flex items-center justify-between">
            {/* Left Content */}
            <div className="text-white max-w-2xl">
              <h2 className="font-arizonia text-primary-400 text-3xl mb-2">
                Discover Ethiopia
              </h2>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Land of
                <br />
                Origins and Wonders
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Travel to any corner of the world, without going around in
                circles
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/book"
                  className="px-8 py-3 bg-primary hover:bg-primary-700 rounded-lg font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                  Book Now
                </Link>
                <Link
                  href="/packages"
                  className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-lg backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                  Explore Packages
                </Link>
              </div>
            </div>

            {/* Right Content - Video Play Button */}
            <div className="hidden md:block">
              <button
                onClick={() => setShowVideo(true)}
                className="w-24 h-24 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Play video">
                <Play className="w-12 h-12 text-primary-600 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
              onClick={() => setShowVideo(false)}>
              <X className="h-8 w-8" />
            </button>
            <iframe
              src="https://player.vimeo.com/video/133876414?autoplay=1"
              title="Travel Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </>
  );
}
