import { MinimalDestination } from "@/types/destinations/types";
import StarIcon from "../ui/svgs/StarSVG";
import { Tag } from "lucide-react";
import Link from "next/link";

export default function PopularDestinationCard({
  destination,
}: {
  destination: MinimalDestination;
}) {
  return (
    <div
      // ****************************** FIX LATER ********************************* // => key = id
      key={destination.name}
      className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg?height=300&width=400"}
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
      <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-2 mt-4 px-4">
        {destination.activities.map((activity) => (
          <span
            key={activity}
            className="bg-muted px-3 py-1 rounded-full text-xs inline-flex items-center shrink-0">
            <Tag size={15} className="mr-2 dark:text-cyan-300" />
            {activity}
          </span>
        ))}
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
  );
}
