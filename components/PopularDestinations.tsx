import { MinimalDestination } from "@/types/destinations/types";
import PopularDestinationCard from "./home/PopularDestinationCard";

const getPopularDestinations = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/destinations/popular`,
    {
      next: { revalidate: 21600 },
      cache: "force-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch destination");
  const data = await res.json();
  return data;
};

export default async function PopularDestinations() {
  const destinations: MinimalDestination[] = await getPopularDestinations();
  return (
    <section id="destinations" className="pb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {/* FIX LATER TRANSLATIONS */}
          {/* {translations.popularDestinations || "Popular Destinations"} */}
          Popular Destinations
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Explore our most sought-after destinations loved by travelers around
          the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <PopularDestinationCard
            key={destination.id}
            destination={destination}
          />
        ))}
      </div>
    </section>
  );
}
