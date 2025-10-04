"use client";

import { Star, MapPin, TrendingUp } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import destinations from "@/data/destinations";

export default function TrendingDestinations() {
  // Get first 4 destinations as trending
  const trendingDestinations = destinations.slice(0, 4);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-primary-600" />
          Trending Destinations
        </h2>
        <LocalizedLink
          href="/destinations"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
          View All
          <MapPin className="h-4 w-4 ml-1" />
        </LocalizedLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingDestinations.map((destination) => (
          <LocalizedLink
            key={destination.id}
            href={`/destinations/${destination.id}`}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative overflow-hidden">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{destination.rating}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Trending
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {destination.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-primary-600 font-semibold">
                  From ${destination?.price || "777.77"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {destination?.duration || "77"}
                </span>
              </div>
            </div>
          </LocalizedLink>
        ))}
      </div>
    </div>
  );
}
