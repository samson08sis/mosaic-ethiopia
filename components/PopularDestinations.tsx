"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import StarIcon from "./ui/svgs/StarSVG";
// import destinations from "@/data/destinations";

export default function PopularDestinations() {
  const { translations } = useLanguage();

  const destinations = [
    {
      id: "lalibela",
      name: "Lalibela, Ethiopia",
      image: "/lalibela-bete-giorgis.jpg",
      rating: 4.9,
      reviews: 245,
    },
    {
      id: "simien-mountains",
      name: "Simien Mountains, Ethiopia",
      image: "/bg-2.jpg",
      rating: 4.8,
      reviews: 187,
    },
    {
      id: "danakil",
      name: "Danakil Depression, Ethiopia",
      image: "/bg-53.jpg",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "gondar",
      name: "Gondar, Ethiopia",
      image: "/bg-54.jpg",
      rating: 4.6,
      reviews: 132,
    },
  ];

  return (
    <section id="destinations" className="pb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.popularDestinations || "Popular Destinations"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Explore our most sought-after destinations loved by travelers around
          the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <div className="relative h-64 overflow-hidden">
              <img
                src={
                  destination.image || "/placeholder.svg?height=300&width=400"
                }
                alt={destination.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center">
                  <StarIcon customStyle="text-yellow-400" />
                  <span className="ml-1">
                    {destination.rating} ({destination.reviews})
                  </span>
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {destination.name}
              </h3>
              <div className="mt-4 flex flex-col xl:flex-row gap-2">
                <Link
                  href={`/destinations/${destination.id}`}
                  className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                  View Details
                </Link>
                <Link
                  href={`/book?destination=${destination.id}`}
                  className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
