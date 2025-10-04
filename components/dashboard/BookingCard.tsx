"use client";

import { Booking } from "@/types/bookings/types";
import { Calendar, MapPin, Clock, MoreHorizontal } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { useState } from "react";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-l-4 border-primary-500">
      <div className="relative">
        <img
          src={booking.image || "/placeholder.svg"}
          alt={booking.packageName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              booking.status
            )}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {booking.daysRemaining} days to go
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {booking.packageName}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {booking.destination}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-600">
                <LocalizedLink
                  href={`/bookings/${booking.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  View Details
                </LocalizedLink>
                <LocalizedLink
                  href={`/bookings/modify/${booking.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Modify Booking
                </LocalizedLink>
                <LocalizedLink
                  href={`/bookings/reschedule/${booking.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Reschedule
                </LocalizedLink>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(booking.startDate)}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatDate(booking.endDate)}
          </div>
        </div>

        <div className="flex space-x-3">
          <LocalizedLink
            href={`/bookings/${booking.id}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
            View Details
          </LocalizedLink>
          <LocalizedLink
            href={`/bookings/modify/${booking.id}`}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
            Modify
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
