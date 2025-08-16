import Link from "next/link";
import HeroSlider from "./HeroSlider.client";
import VideoTrigger from "./VideoTrigger.client";
import ScrollDownButton from "./ScrollDownButton.client";
import { HeroSlideType } from "@/types/types";

export default function Hero({ slides }: { slides: HeroSlideType[] }) {
  const initialSlide = 0; // Math.floor(Math.random() * slides.length)
  return (
    <>
      <div className="relative h-screen">
        {/* Background Slider - CSR */}
        <HeroSlider slides={slides} initialSlide={initialSlide} />

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="h-full flex flex-col items-start md:items-center justify-center md:flex-row md:justify-between gap-8 py-8">
            {/* Left Content - Centered on mobile */}
            <div className="text-white max-w-2xl text-left order-2 md:order-1">
              <h2 className="font-arizonia text-primary-400 text-2xl md:text-3xl mb-2">
                Discover Ethiopia
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Land of
                <br />
                Origins and Wonders
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200">
                Experience ancient history, diverse cultures, and breathtaking
                landscapes
              </p>
              <div className="flex flex-col sm:flex-row text-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link
                  href="/book"
                  className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-3 bg-primary hover:bg-primary-700 rounded-lg font-medium text-base md:text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                  Book Now
                </Link>
                <Link
                  href="/packages"
                  className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-base md:text-lg backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
                  Explore Packages
                </Link>
              </div>
            </div>

            {/* Video Play Button - Mobile responsive */}
            <div className="order-1 md:order-2 flex justify-center md:block">
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
