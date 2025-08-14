import { Destination } from "@/types/destinations/types";
import { MapPin, Star, Tag } from "lucide-react";
import Link from "next/link";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div
      key={destination.id}
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <img
          src={destination.image || "/placeholder.svg?height=300&width=400"}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center shadow-md">
          <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-sm font-medium">{destination.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl font-bold text-card-foreground">
            {destination.name}
          </h2>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1 dark:text-cyan-300" />
            {destination.nearestCity}
          </div>
        </div>

        <p className=" mb-4">{destination.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {destination.activities.map((activity) => (
            <span
              key={activity}
              className="bg-muted px-3 py-1 rounded-full text-sm flex flex-row">
              <Tag size={16} className="mr-2 dark:text-cyan-300" />
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
              // onClick={handleNavigate}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
              View Details
            </Link>
            <Link
              href={`/book?destination=${destination.id}`}
              // onClick={handleNavigate}
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
