"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Star,
  Clock,
  Info,
  Camera,
  Award,
  ArrowRight,
  Check,
} from "lucide-react";
import destinations from "@/data/destinations";
import PageHeader from "@/components/PageHeader";
import { Destination } from "@/types/destinations/types";
import Weather from "@/components/Weather";

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundDestination = destinations.find((dest) => dest.id === id);
      setDestination(foundDestination || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 pb-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="pt-20 pb-16 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
        <Link href="/destinations" className="text-primary hover:underline">
          Back to all destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-theme">
      <PageHeader
        title={destination.name}
        subtitle={destination.description}
        backgroundImage={destination.image}
        overlayColor="primary"
        overlayOpacity={0.7}>
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <Star
              className="h-5 w-5 text-yellow-400 mr-2"
              fill="currentColor"
            />
            <span className="font-medium">
              {destination.rating} ({destination.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{destination.location}</span>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Best time: {destination.bestTimeToVisit}</span>
          </div>
        </div>
        <Weather location={destination.city || "Addis Ababa"} days={6} />
      </PageHeader>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights Section */}
            <section className="bg-card rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-primary" />
                Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                      <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Things to Do Section */}
            <section className="bg-card rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Camera className="h-6 w-6 mr-2 text-primary" />
                Things to Do
              </h2>
              <div className="space-y-4">
                {destination.thingsToDo.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {activity}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Historical & Cultural Significance */}
            {(destination.historicalImportance ||
              destination.culturalSignificance ||
              destination.naturalFeatures) && (
              <section className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Info className="h-6 w-6 mr-2 text-primary" />
                  More About {destination.name.split(",")[0]}
                </h2>
                <div className="space-y-4">
                  {destination.historicalImportance && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Historical Importance
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {destination.historicalImportance}
                      </p>
                    </div>
                  )}
                  {destination.culturalSignificance && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Cultural Significance
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {destination.culturalSignificance}
                      </p>
                    </div>
                  )}
                  {destination.naturalFeatures && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Natural Features
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {destination.naturalFeatures}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Now Card */}
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Ready to Visit?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Book your trip to {destination.name.split(",")[0]} and
                experience all it has to offer.
              </p>
              <Link
                href={`/book?destination=${destination.id}`}
                className="w-full block text-center py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                Book Now
              </Link>
            </div>

            {/* Activities Card */}
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Activities</h3>
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((activity) => (
                  <span
                    key={activity}
                    className="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            {/* Best Time to Visit */}
            <div className="bg-card rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Best Time to Visit
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {destination.bestTimeToVisit}
              </p>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  The dry season offers the best conditions for sightseeing and
                  outdoor activities. During this time, you'll experience clear
                  skies and comfortable temperatures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
