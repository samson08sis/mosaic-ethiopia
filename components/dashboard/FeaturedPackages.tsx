"use client";

import { Star, Clock, Users, Package } from "lucide-react";
import Link from "next/link";
import packages from "@/data/packages";

export default function FeaturedPackages() {
  // Get first 3 packages as featured
  const featuredPackages = packages.slice(0, 3);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Package className="h-6 w-6 mr-2 text-primary-600" />
          Featured Packages
        </h2>
        <Link
          href="/packages"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
          View All
          <Package className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="relative">
              <img
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                ${pkg.price}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {pkg.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {pkg.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {pkg.groupSize || "77"}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  {pkg.rating || "5.05"}
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  href={`/packages/${pkg.id}`}
                  className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                  View Details
                </Link>
                <Link
                  href={`/book?package=${pkg.id}`}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
