"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Tag,
  Globe,
  Heart,
} from "lucide-react";

export default function DestinationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch this data from an API
  // For this demo, we'll use a mock data object
  useEffect(() => {
    // Simulate API fetch
    const fetchDestination = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call like:
        // const response = await fetch(`/api/destinations/${params.id}`)
        // const data = await response.json()

        // Mock data for demonstration
        const mockDestinations = {
          "1": {
            id: 1,
            name: "Bali, Indonesia",
            image:
              "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            rating: 4.8,
            reviews: 230,
            description:
              "Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a stretch of fine white sand, or commune with the tropical creatures as you dive along coral ridges or the colorful wreck of a WWII war ship.",
            longDescription:
              "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
            location: "Indonesia",
            bestTimeToVisit: "April to October",
            averageCost: "$50-100 per day",
            duration: "7-10 days recommended",
            activities: [
              "Beach relaxation",
              "Temple visits",
              "Surfing",
              "Rice terrace trekking",
              "Spa treatments",
              "Cooking classes",
            ],
            attractions: [
              {
                name: "Ubud Monkey Forest",
                description: "Natural sanctuary home to over 700 monkeys",
              },
              {
                name: "Tegallalang Rice Terraces",
                description:
                  "Stunning stepped rice paddies in the Ubud countryside",
              },
              {
                name: "Uluwatu Temple",
                description: "Ancient sea temple perched on a steep cliff",
              },
              {
                name: "Tanah Lot",
                description:
                  "Iconic rock formation with a temple sitting atop it",
              },
              {
                name: "Sacred Monkey Forest Sanctuary",
                description: "Hindu temple complex with resident monkeys",
              },
            ],
            packages: [
              { id: 1, name: "Bali Adventure", price: 1299, duration: 7 },
              {
                id: 4,
                name: "Bali Relaxation Retreat",
                price: 1599,
                duration: 10,
              },
            ],
            gallery: [
              "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            ],
          },
          "2": {
            id: 2,
            name: "Santorini, Greece",
            image:
              "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
            rating: 4.9,
            reviews: 312,
            description:
              "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape and its iconic whitewashed, cubiform houses of its two principal towns.",
            longDescription:
              "Santorini is essentially what remains after an enormous volcanic eruption that destroyed the earliest settlements on a formerly single island, and created the current geological caldera. A giant central, rectangular lagoon, which measures about 12 by 7 km, is surrounded by 300 m high, steep cliffs on three sides.",
            location: "Greece",
            bestTimeToVisit: "April to November",
            averageCost: "$100-200 per day",
            duration: "4-7 days recommended",
            activities: [
              "Sunset watching",
              "Wine tasting",
              "Boat tours",
              "Beach relaxation",
              "Photography",
              "Hiking",
            ],
            attractions: [
              {
                name: "Oia",
                description:
                  "Famous for its stunning sunsets and white Cycladic houses",
              },
              {
                name: "Fira",
                description:
                  "The island's capital with panoramic views of the caldera",
              },
              {
                name: "Red Beach",
                description: "Unique beach with red volcanic sand and cliffs",
              },
              {
                name: "Ancient Thera",
                description:
                  "Archaeological site with ruins from the Hellenistic era",
              },
              {
                name: "Akrotiri",
                description: "Prehistoric settlement preserved in volcanic ash",
              },
            ],
            packages: [
              {
                id: 2,
                name: "Greek Island Hopping",
                price: 1799,
                duration: 10,
              },
              {
                id: 5,
                name: "Santorini Romantic Getaway",
                price: 1499,
                duration: 5,
              },
            ],
            gallery: [
              "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
              "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            ],
          },
          "3": {
            id: 3,
            name: "Kyoto, Japan",
            image:
              "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            rating: 4.7,
            reviews: 189,
            description:
              "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
            longDescription:
              "Kyoto was the capital of Japan for more than a thousand years, and it still bears the imprint of the grace, elegance, and serenity of that era. With over 1,600 Buddhist temples and 400 Shinto shrines, Kyoto is one of the best-preserved cities in Japan and has been designated a UNESCO World Heritage site.",
            location: "Japan",
            bestTimeToVisit: "March-May and October-November",
            averageCost: "$100-150 per day",
            duration: "5-7 days recommended",
            activities: [
              "Temple visits",
              "Tea ceremonies",
              "Garden tours",
              "Kimono experiences",
              "Traditional crafts",
              "Sake tasting",
            ],
            attractions: [
              {
                name: "Fushimi Inari Shrine",
                description:
                  "Famous for its thousands of vermilion torii gates",
              },
              {
                name: "Kinkaku-ji (Golden Pavilion)",
                description: "Zen temple covered in gold leaf",
              },
              {
                name: "Arashiyama Bamboo Grove",
                description: "Iconic bamboo forest path",
              },
              {
                name: "Gion District",
                description: "Traditional area known for geisha sightings",
              },
              {
                name: "Kiyomizu-dera Temple",
                description:
                  "Buddhist temple offering panoramic views of Kyoto",
              },
            ],
            packages: [
              {
                id: 3,
                name: "Japan Cultural Experience",
                price: 2299,
                duration: 12,
              },
              { id: 6, name: "Kyoto Heritage Tour", price: 1899, duration: 8 },
            ],
            gallery: [
              "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1493997181344-712f2f19d87a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            ],
          },
          "4": {
            id: 4,
            name: "Machu Picchu, Peru",
            image:
              "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            rating: 4.9,
            reviews: 275,
            description:
              "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it's renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.",
            longDescription:
              "Machu Picchu stands 2,430 meters above sea level, in the middle of a tropical mountain forest, in an extraordinarily beautiful setting. It was probably the most amazing urban creation of the Inca Empire at its height; its giant walls, terraces and ramps seem as if they have been cut naturally in the continuous rock escarpments.",
            location: "Peru",
            bestTimeToVisit: "May to September",
            averageCost: "$80-150 per day",
            duration: "3-5 days recommended",
            activities: [
              "Hiking the Inca Trail",
              "Archaeological tours",
              "Mountain climbing",
              "Photography",
              "Cultural experiences",
              "Wildlife watching",
            ],
            attractions: [
              {
                name: "The Citadel",
                description:
                  "Main archaeological site with impressive stone structures",
              },
              {
                name: "Huayna Picchu",
                description:
                  "Mountain peak offering stunning views of Machu Picchu",
              },
              {
                name: "Sun Gate (Inti Punku)",
                description:
                  "Historic entrance to Machu Picchu along the Inca Trail",
              },
              {
                name: "Temple of the Sun",
                description: "Sacred astronomical observatory",
              },
              {
                name: "Intihuatana Stone",
                description:
                  "Ancient ritual stone associated with the astronomical calendar",
              },
            ],
            packages: [
              { id: 7, name: "Peru Explorer", price: 2099, duration: 9 },
              { id: 8, name: "Inca Trail Adventure", price: 1899, duration: 7 },
            ],
            gallery: [
              "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1531065208531-4036c0dba3d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
              "https://images.unsplash.com/photo-1553374402-559e8b431161?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            ],
          },
        };

        // Get destination by ID from params
        const data = mockDestinations[params.id];

        if (data) {
          setDestination(data);
        } else {
          // Handle not found
          router.push("/destinations");
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-theme">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex flex-col items-center justify-center bg-theme">
        <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
        <Link href="/destinations" className="text-primary hover:underline">
          Back to all destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-theme">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="container mx-auto">
            <Link
              href="/destinations"
              className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to destinations
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {destination.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{destination.rating}</span>
                <span className="ml-1 text-white/70">
                  ({destination.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="ml-1">{destination.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}>
              Overview
            </button>
            <button
              onClick={() => setActiveTab("attractions")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "attractions"
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}>
              Attractions
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "packages"
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}>
              Packages
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "gallery"
                  ? "border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}>
              Gallery
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  About {destination.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {destination.longDescription}
                </p>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Activities
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/book?destination=${encodeURIComponent(
                    destination.name
                  )}`}
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Book This Destination
                </Link>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Travel Information
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-gray-900 dark:text-white">
                        Location
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {destination.location}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-gray-900 dark:text-white">
                        Best Time to Visit
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {destination.bestTimeToVisit}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-gray-900 dark:text-white">
                        Recommended Duration
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {destination.duration}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Tag className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-gray-900 dark:text-white">
                        Average Cost
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {destination.averageCost}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block font-medium text-gray-900 dark:text-white">
                        Language
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {destination.location === "Japan"
                          ? "Japanese"
                          : destination.location === "Indonesia"
                          ? "Indonesian, English"
                          : destination.location === "Greece"
                          ? "Greek, English"
                          : destination.location === "Peru"
                          ? "Spanish, Quechua"
                          : "Local language, English"}
                      </span>
                    </div>
                  </li>
                </ul>

                <button className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <Heart className="h-5 w-5 mr-2" />
                  Save to Wishlist
                </button>
              </div>
            </div>
          )}

          {/* Attractions Tab */}
          {activeTab === "attractions" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Top Attractions in {destination.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.attractions.map((attraction, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {attraction.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {attraction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === "packages" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Available Packages for {destination.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center mb-4">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {pkg.duration} days
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${pkg.price}
                        </span>
                        <Link
                          href={`/book?package=${pkg.id}`}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Photo Gallery of {destination.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destination.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${destination.name} - Photo ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
