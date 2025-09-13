import PopularDestinations from "../PopularDestinations";
import TourPackages from "../TourPackages";
import { Suspense } from "react";
import { DestinationsSkeleton } from "./DestinationSkeleton";
import TestimonialWrapper from "../TestimonialWrapper";

export default async function MainContent() {
  return (
    <div className="relative bg-theme">
      <div className="container mx-auto px-4 pt-16">
        {/* Popular Destinations */}
        <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
          Mosaic Provides Places
        </h2>
        <Suspense fallback={<DestinationsSkeleton />}>
          <PopularDestinations />
        </Suspense>
        {/* Tour Packages */}
        <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
          Mosaic Provides Customizable Packages
        </h2>
        <TourPackages />

        {/* Testimonials */}
        <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
          Customers' Feedback
        </h2>
        <TestimonialWrapper />
      </div>
    </div>
  );
}
