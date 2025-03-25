"use client";

import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description:
        "Experience the perfect blend of stunning beaches, lush rice terraces, and vibrant cultural heritage in Bali, Indonesia's tropical paradise.",
      rating: 4.8,
      reviews: 230,
      continent: "Asia",
      activities: ["Beach", "Culture", "Adventure"],
    },
    {
      id: 2,
      name: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      description:
        "Discover the iconic white-washed buildings and blue domes perched on cliffs overlooking the Aegean Sea in this breathtaking Greek island.",
      rating: 4.9,
      reviews: 312,
      continent: "Europe",
      activities: ["Sightseeing", "Beaches", "Cuisine"],
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description:
        "Step back in time in Kyoto, where ancient temples, traditional tea houses, and beautiful gardens showcase Japan's rich cultural heritage.",
      rating: 4.7,
      reviews: 189,
      continent: "Asia",
      activities: ["Culture", "History", "Nature"],
    },
    {
      id: 4,
      name: "Machu Picchu, Peru",
      image:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description:
        "Explore the ancient Incan citadel set high in the Andes Mountains, offering spectacular views and a glimpse into a fascinating lost civilization.",
      rating: 4.9,
      reviews: 275,
      continent: "South America",
      activities: ["Hiking", "History", "Adventure"],
    },
    {
      id: 5,
      name: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description:
        "Fall in love with the City of Light, home to iconic landmarks like the Eiffel Tower, world-class museums, and charming cafés.",
      rating: 4.7,
      reviews: 420,
      continent: "Europe",
      activities: ["Culture", "Cuisine", "Shopping"],
    },
    {
      id: 6,
      name: "Cape Town, South Africa",
      image:
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      description:
        "Experience the stunning beauty of Table Mountain, pristine beaches, and vibrant culture in this diverse coastal city.",
      rating: 4.6,
      reviews: 185,
      continent: "Africa",
      activities: ["Nature", "Wildlife", "Adventure"],
    },
    // Other destinations...
  ];

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
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Explore Amazing Destinations
          </h1>
          <p className="text-xl max-w-2xl mb-8">
            Discover breathtaking locations around the world and plan your next
            unforgettable journey.
          </p>

          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search destinations, activities, or regions..."
              className="w-full p-4 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-4 text-gray-500" />
          </div>
        </div>
      </div>

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
                  <a
                    href={`/destinations/${destination.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                    View Details
                  </a>
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
