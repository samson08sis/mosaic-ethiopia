"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Play, X } from "lucide-react";
import Link from "next/link";
import VideoModal from "./ui/video-modal";

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
  const [currentSlide, setCurrentSlide] = useState(
    // Math.floor(Math.random() * slides.length)
    0
  );
  const [showVideo, setShowVideo] = useState(false);
  const watchedSlides = useRef<number[]>([currentSlide]);

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
                Experience ancient history, diverse cultures, and breathtaking
                landscapes
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/book"
                  className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-700 rounded-lg font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                  Book Now
                </Link>
                <Link
                  href="/packages"
                  className="w-full sm:w-auto px-8 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-lg backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                  Explore Packages
                </Link>
              </div>
            </div>

            {/* Right Content - Video Play Button */}
            <div className="hidden md:block">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                onClick={() => setShowVideo(true)}
                className="cursor-pointer hover:scale-105 transition-transform"
                aria-label="Play video"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === "Enter" && setShowVideo(true)}
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="40"
                  cy="40"
                  r="40"
                  fill="white"
                  fillOpacity="0.9"
                  className="group-hover:fill-white transition-colors"
                />
                <path
                  d="M52 40L34 50.3923L34 29.6077L52 40Z"
                  fill="#E67E22"
                  className="group-hover:scale-110 transition-transform origin-center"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="39"
                  stroke="#0D9488"
                  strokeWidth="2"
                  className="group-hover:stroke-primary-600 transition-colors"
                />
              </svg>
            </div>
          </div>
        </div>
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
          aria-label="Scroll down">
          <ChevronDown className="h-10 w-10" />
        </button>
      </div>

      {/* Video Modal */}
      {showVideo && <VideoModal setShowVideo={setShowVideo} />}
    </>
  );
}
