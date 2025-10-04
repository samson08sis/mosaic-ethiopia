import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/contexts/BookingContext";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import { useEffect, useState } from "react";

export default function BookingContent() {
  const { bookings, loading } = useBookings();
  const [timeRemaining, setTimeRemaining] = useState<
    Record<
      string,
      { days: number; hours: number; minutes: number; seconds: number }
    >
  >({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  // Update countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining: Record<
        string,
        { days: number; hours: number; minutes: number; seconds: number }
      > = {};

      bookings.forEach((booking) => {
        const now = new Date();
        const diff = booking.startDate.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          newTimeRemaining[booking.id] = { days, hours, minutes, seconds };
        } else {
          newTimeRemaining[booking.id] = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      });

      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Handle delete booking
  const openDeleteModal = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBookingToDelete(null);
    setDeleteModalOpen(false);
  };

  const confirmDeleteBooking = () => {
    if (bookingToDelete) {
      // setBookings(bookings.filter((booking) => booking.id !== bookingToDelete));
      closeDeleteModal();
    }
  };

  return (
    <>
      {!loading && bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have any current bookings.
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
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

                {/* Countdown Timer */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                  <div className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="font-medium">Time until your trip:</span>
                  </div>

                  {timeRemaining[booking.id] && (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <span className="block text-2xl font-bold text-primary dark:text-primary-400">
                          {timeRemaining[booking.id].days}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Days
                        </span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-primary dark:text-primary-400">
                          {timeRemaining[booking.id].hours}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Hours
                        </span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-primary dark:text-primary-400">
                          {timeRemaining[booking.id].minutes}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Mins
                        </span>
                      </div>
                      <div>
                        <span className="block text-2xl font-bold text-primary dark:text-primary-400">
                          {timeRemaining[booking.id].seconds}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Secs
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${booking.price}
                  </span>

                  <div className="space-x-2">
                    <LocalizedLink
                      href={`/bookings/modify?id=${booking.id}`}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      Modify
                    </LocalizedLink>
                    <LocalizedLink
                      href={`/bookings/reschedule?id=${booking.id}`}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      Reschedule
                    </LocalizedLink>
                    <button
                      onClick={() => openDeleteModal(booking.id)}
                      className="px-3 py-1 text-sm border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Cancel Booking
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to cancel this booking? This action cannot
              be undone and may be subject to cancellation fees.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                Keep Booking
              </button>
              <button
                onClick={confirmDeleteBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
