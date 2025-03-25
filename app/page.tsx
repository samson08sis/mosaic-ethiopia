"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, X } from "lucide-react";
import PopularDestinations from "@/components/PopularDestinations";
import TourPackages from "@/components/TourPackages";
import Testimonials from "@/components/Testimonials";
import Hero from "@/components/Hero";
import ImageFeatures from "@/components/ImageFeatures";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <Hero />
      {/* Main Content with Background to Cover Hero Image */}
      <div className="relative bg-theme">
        <div className="container mx-auto px-4 pt-16">
          {/* Welcome Section with Image Features - Side by side on large screens */}
          <div className="py-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12">
              {/* Welcome Text - Full width on mobile, half width on large screens */}
              <div className="mb-12 lg:mb-0 lg:w-5/12 text-center lg:text-left">
                <h2 className="font-arizonia text-4xl md:text-5xl text-primary mb-6">
                  Welcome to Our World
                </h2>
                <p className="text-lg mb-8">
                  At Travel Explorer, we believe that travel is not just about
                  visiting new places, but about creating meaningful experiences
                  that last a lifetime. Our carefully curated destinations and
                  packages are designed to help you discover the world's most
                  breathtaking locations while immersing yourself in local
                  cultures.
                </p>
                <Link
                  href="/about"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Learn More About Us
                </Link>
              </div>

              {/* Image Features - Full width on mobile, half width on large screens */}
              <div className="lg:w-7/12">
                <ImageFeatures />
              </div>
            </div>
          </div>

          <PopularDestinations />
          <TourPackages />
          <Testimonials />
        </div>
      </div>
    </>
  );
}
