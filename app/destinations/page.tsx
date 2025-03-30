"use client";

import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import destinations from "@/data/destinations";

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.continent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.activities.some((activity) =>
        activity.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="pt-20 pb-16 bg-theme">
      <PageHeader
        title="Explore Ethiopia"
        subtitle="Discover the ancient wonders, breathtaking landscapes, and rich cultural heritage of Ethiopia, the land of origins."
        backgroundImage="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        overlayColor="primary"
        overlayOpacity={0.7}>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search destinations, activities, or regions..."
            className="w-full p-4 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-4 text-gray-500" />
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <img
                  src={
                    destination.image || "/placeholder.svg?height=300&width=400"
                  }
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center shadow-md">
                  <Star
                    className="h-4 w-4 text-yellow-400 mr-1"
                    fill="currentColor"
                  />
                  <span className="text-sm font-medium">
                    {destination.rating}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-card-foreground">
                    {destination.name}
                  </h2>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.continent}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.activities.map((activity) => (
                    <span
                      key={activity}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {destination.reviews} reviews
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={`/destinations/${destination.id}`}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                      View Details
                    </Link>
                    <Link
                      href={`/book?destination=${destination.id}`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">
              No destinations found matching your search.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
