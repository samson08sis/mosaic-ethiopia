"use client";

import PopularDestinations from "@/components/PopularDestinations";
import TourPackages from "@/components/TourPackages";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";
import WelcomeSection from "@/components/WelcomeSection";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Main Content with Background to Cover Hero Image */}
      <div className="relative bg-theme">
        <div className="container mx-auto px-4 pt-16">
          {/* Welcome Section with Image Features - Side by side on large screens */}
          <WelcomeSection />
          <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
            Mosaic Provides Places
          </h2>
          <PopularDestinations />
          <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
            Mosaic Provides Customizable Packages
          </h2>
          <TourPackages />
          <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
            Customers' Feedback
          </h2>
          <Testimonials />
        </div>
      </div>
    </>
  );
}
