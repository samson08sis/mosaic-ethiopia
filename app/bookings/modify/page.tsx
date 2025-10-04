"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";

export default function ModifyBooking() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get("id");

  const [formData, setFormData] = useState({
    guests: 2,
    specialRequests: "",
    roomPreference: "standard",
    mealPreference: "all-inclusive",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess(true);
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Modify Your Booking
        </h1>

        {success ? (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
              Modification Request Submitted
            </h2>
            <p className="text-green-700 dark:text-green-400 mb-4">
              We've received your request to modify booking #{bookingId}. Our
              team will review your request and contact you within 24 hours.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <LocalizedLink
                href="/bookings"
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Back to Bookings
              </LocalizedLink>
              <LocalizedLink
                href="/"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700">
                Home
              </LocalizedLink>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Important Information
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Modification requests are subject to availability and may
                    incur additional fees. Our team will contact you to confirm
                    any changes.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="roomPreference"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Room Preference
                </label>
                <select
                  id="roomPreference"
                  name="roomPreference"
                  value={formData.roomPreference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white">
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="mealPreference"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meal Preference
                </label>
                <select
                  id="mealPreference"
                  name="mealPreference"
                  value={formData.mealPreference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white">
                  <option value="all-inclusive">All Inclusive</option>
                  <option value="breakfast-only">Breakfast Only</option>
                  <option value="half-board">Half Board</option>
                  <option value="full-board">Full Board</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requirements or requests..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <LocalizedLink
                  href="/bookings"
                  className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  Cancel
                </LocalizedLink>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
