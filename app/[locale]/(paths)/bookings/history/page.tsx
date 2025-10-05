"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";

// Mock data for booking history
const mockBookingHistory = [
  {
    id: "hist-1",
    destination: "Axum Historical Sites",
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    endDate: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000), // 53 days ago
    guests: 2,
    price: 1199,
    image: "/placeholder.svg?height=200&width=300",
    rating: 5,
  },
  {
    id: "hist-2",
    destination: "Blue Nile Falls",
    startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
    endDate: new Date(Date.now() - 113 * 24 * 60 * 60 * 1000), // 113 days ago
    guests: 3,
    price: 1499,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4,
  },
];

export default function BookingHistory() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState(mockBookingHistory);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Handle rating change
  const handleRatingChange = (bookingId: string, newRating: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, rating: newRating } : booking
      )
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Booking History
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have any past bookings.
          </p>
          <LocalizedLink
            href="/packages"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-700">
            Explore Tour Packages
          </LocalizedLink>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
              <div className="relative h-48">
                <img
                  src={booking.image || "/placeholder.svg"}
                  alt={booking.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    Completed
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {booking.destination}
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {formatDate(booking.startDate)} -{" "}
                      {formatDate(booking.endDate)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {booking.guests}{" "}
                      {booking.guests === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Ethiopia</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Rating:
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(booking.id, star)}
                        className="focus:outline-none">
                        <Star
                          className={`h-6 w-6 ${
                            star <= booking.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${booking.price}
                  </span>

                  <LocalizedLink
                    href={`/bookings/details?id=${booking.id}`}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    View Details
                  </LocalizedLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
