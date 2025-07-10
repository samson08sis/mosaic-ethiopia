"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { PackagesSkeleton } from "../PackageSkeleton";
import { DestinationsSkeleton } from "../DestinationSkeleton";

// Dynamic imports for client components
const PopularDestinations = dynamic(
  () => import("@/components/PopularDestinations"),
  {
    ssr: false,
    loading: () => <DestinationsSkeleton />,
  }
);

const TourPackages = dynamic(() => import("@/components/TourPackages"), {
  ssr: false,
  loading: () => <PackagesSkeleton />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center">
      Loading testimonials...
    </div>
  ),
});

export default function HomeContent() {
  return (
    <>
      {/* Main content with background to cover Hero image */}
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
          <Suspense fallback={<PackagesSkeleton />}>
            <TourPackages />
          </Suspense>

          {/* Testimonials */}
          <h2 className="font-arizonia text-primary-400 text-3xl mb-6 mt-16 text-center">
            Customers' Feedback
          </h2>
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center">
                Loading testimonials...
              </div>
            }>
            <Testimonials />
          </Suspense>
        </div>
      </div>
    </>
  );
}
