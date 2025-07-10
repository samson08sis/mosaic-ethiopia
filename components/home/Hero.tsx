"use client";

import Link from "next/link";
import HeroSlider from "./HeroSlider.client";
import VideoTrigger from "./VideoTrigger.client";
import ScrollDownButton from "./ScrollDownButton.client";

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
  {
    id: "26",
    image: "/culture-2.jpg",
    alt: "",
  },
];

export default function Hero() {
  const initialSlide = 0; // Math.floor(Math.random() * slides.length)

  return (
    <>
      <div className="relative h-screen">
        {/* Background Slider - CSR */}
        <HeroSlider slides={slides} initialSlide={initialSlide} />

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10">
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
              <VideoTrigger />
            </div>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton />
      </div>
    </>
  );
}
