"use client";

import { Progress } from "@/components/ui/progress";

// Mock data for popular destinations
const popularDestinations = [
  {
    name: "Lalibela, Ethiopia",
    bookings: 245,
    percentage: 85,
  },
  {
    name: "Simien Mountains, Ethiopia",
    bookings: 187,
    percentage: 65,
  },
  {
    name: "Danakil Depression, Ethiopia",
    bookings: 156,
    percentage: 54,
  },
  {
    name: "Gondar, Ethiopia",
    bookings: 132,
    percentage: 46,
  },
  {
    name: "Axum, Ethiopia",
    bookings: 118,
    percentage: 41,
  },
];

export function PopularDestinations() {
  return (
    <div className="space-y-6">
      {popularDestinations.map((destination) => (
        <div key={destination.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none">
                {destination.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {destination.bookings} bookings
              </p>
            </div>
            <div className="text-sm font-medium">{destination.percentage}%</div>
          </div>
          <Progress value={destination.percentage} className="h-2" />
        </div>
      ))}
    </div>
  );
}
