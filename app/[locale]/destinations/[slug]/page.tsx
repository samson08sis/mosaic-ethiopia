// import { getDestinationById, getAllDestinationIds } from "@/lib/db";
import PageHeader from "@/components/PageHeader";
import Weather from "@/components/Weather";
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
import Carousel from "@/components/ui/carousel";
import Image from "next/image";
import MapSection from "@/components/pages/contact/MapSection.client";
import { Destination } from "@/types/destinations/types";

async function getDestination(slug: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/destinations/${slug}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch destination: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const destination: Destination = await getDestination(slug);
  // const destination: Destination =
  //   destinations.find((d) => d.slug === slug) || destinations[0];

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
        overlayOpacity={0}>
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
            <span>{destination.region}</span>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Best time: {destination.bestTimeToVisit}</span>
          </div>
        </div>
        <Weather location={destination.city || "Addis Ababa"} days={3} />
      </PageHeader>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="w-full mx-auto rounded-xl bg-card shadow-md overflow-hidden">
              <Carousel
                itemsPerView={1}
                autoPlay
                showDots
                showArrows
                className="w-full">
                {destination.gallery
                  ? [destination.image, ...destination.gallery].map(
                      (src, index) => (
                        <div
                          key={index}
                          className="relative h-[380px] w-full rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    )
                  : [
                      <div
                        key=""
                        className="relative h-[380px] w-full rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={destination.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>,
                    ]}
              </Carousel>
            </div>
            {/* Highlights Section */}
            {destination.highlights && (
              <section className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-primary" />
                  Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map(
                    (highlight: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                          <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Things to Do Section */}
            {destination.thingsToDo && (
              <section className="bg-card rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Camera className="h-6 w-6 mr-2 text-primary" />
                  Things to Do
                </h2>
                <div className="space-y-4">
                  {destination.thingsToDo.map(
                    (activity: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 mr-3 mt-1">
                          <ArrowRight className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {activity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

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
                href={`/book?destination=${destination.slug}`}
                className="w-full block text-center py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                Book Now
              </Link>
            </div>

            {/* Activities Card */}
            {destination.activities && (
              <div className="bg-card rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity: string) => (
                    <span
                      key={activity}
                      className="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Best Time to Visit */}
            {destination.bestTimeToVisit && (
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
                    The dry season offers the best conditions for sightseeing
                    and outdoor activities. During this time, you'll experience
                    clear skies and comfortable temperatures.
                  </p>
                </div>
              </div>
            )}

            {/* Map */}
            {destination.mapEmbed && (
              <MapSection
                src={destination.mapEmbed}
                title={`${destination.name}'s Location`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
