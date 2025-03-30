"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  Users,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Clock,
  MapPinIcon,
  Utensils,
  Hotel,
  CheckSquare,
  XSquare,
  Camera,
  Star,
} from "lucide-react";
import Link from "next/link";
import packages from "@/data/packages";
import destinations from "@/data/destinations";
import PageHeader from "@/components/PageHeader";

export default function BookPage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const destinationId = searchParams.get("destination");
  const packageName = searchParams.get("name");
  const customDuration = searchParams.get("duration");
  const customPrice = searchParams.get("price");
  const customActivities = searchParams.get("activities");
  const customAccommodation = searchParams.get("accommodation");
  const customMeals = searchParams.get("meals");
  const isCustomized =
    customDuration ||
    customPrice ||
    customActivities ||
    customAccommodation ||
    customMeals;

  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 2,
    children: 0,
    roomType: "standard",
    activities: [] as string[],
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    // Custom package data
    packageName: "",
    customDuration: 0,
    customPrice: 0,
    customActivities: [],
    customAccommodation: "",
    customMeals: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Find selected package if packageId is provided
  const selectedPackage = packageId
    ? packages.find((pkg) => pkg.id === packageId)
    : null;

  // Find selected destination if destinationId is provided
  const selectedDestination = destinationId
    ? destinations.find((dest) => dest.id === destinationId)
    : null;

  // Initialize form data once
  useEffect(() => {
    if (initialized || formSubmitted) return;

    let newFormData = { ...formData };

    // Set destination from selected package or destination
    if (selectedPackage) {
      newFormData.destination = selectedPackage.destinations.join(", ");
    } else if (selectedDestination) {
      newFormData.destination = selectedDestination.name;
    }

    // Set customized package data
    if (isCustomized) {
      let activitiesArray = [];
      try {
        if (customActivities) {
          activitiesArray = JSON.parse(customActivities);
        }
      } catch (e) {
        console.error("Error parsing activities:", e);
      }

      newFormData = {
        ...newFormData,
        packageName:
          packageName || (selectedPackage ? selectedPackage.name : ""),
        customDuration: customDuration
          ? Number.parseInt(customDuration)
          : selectedPackage?.duration || 0,
        customPrice: customPrice
          ? Number.parseInt(customPrice)
          : selectedPackage?.price || 0,
        customActivities: activitiesArray,
        customAccommodation: customAccommodation || "",
        customMeals: customMeals || "",
      };
    }

    setFormData(newFormData);
    setInitialized(true);
  }, [
    initialized,
    formSubmitted,
    selectedPackage,
    selectedDestination,
    isCustomized,
    packageName,
    customDuration,
    customPrice,
    customActivities,
    customAccommodation,
    customMeals,
    formData,
  ]);

  const destinationOptions = [
    { value: "lalibela", label: "Lalibela, Ethiopia" },
    { value: "gondar", label: "Gondar, Ethiopia" },
    { value: "axum", label: "Axum, Ethiopia" },
    { value: "danakil", label: "Danakil Depression, Ethiopia" },
    { value: "omo-valley", label: "Omo Valley, Ethiopia" },
    { value: "bale-mountains", label: "Bale Mountains, Ethiopia" },
  ];

  const activities = [
    { id: "sightseeing", label: "Sightseeing Tours" },
    { id: "adventure", label: "Adventure Activities" },
    { id: "food", label: "Food & Culinary Experiences" },
    { id: "cultural", label: "Cultural Workshops" },
    { id: "relaxation", label: "Spa & Relaxation" },
  ];

  const roomTypes = [
    { value: "standard", label: "Standard Room", price: "$120/night" },
    { value: "deluxe", label: "Deluxe Room", price: "$200/night" },
    { value: "suite", label: "Luxury Suite", price: "$350/night" },
  ];

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value, type } = e.target;
      const checked =
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : undefined;

      if (type === "checkbox") {
        if (checked) {
          setFormData((prev) => ({
            ...prev,
            activities: [...prev.activities, name],
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            activities: prev.activities.filter((activity) => activity !== name),
          }));
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  const nextStep = useCallback(() => {
    setBookingStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setBookingStep((prev) => prev - 1);
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the booking to a server
    // For this demo, we'll just move to a confirmation step
    setBookingStep(3);
    setFormSubmitted(true);
  }, []);

  // Calculate estimated price based on destination if no package is selected
  const getEstimatedPrice = () => {
    if (selectedPackage) return selectedPackage.price;
    if (selectedDestination) {
      // Base price on destination rating
      return Math.round(selectedDestination.rating * 300);
    }
    return 1450; // Default price
  };

  // Render the component
  return (
    <div className="pt-20 pb-16 bg-theme">
      <PageHeader
        title="Book Your Trip"
        subtitle="Complete your booking in just a few simple steps."
        backgroundImage="https://images.unsplash.com/photo-1649433391719-2e784576d044?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        overlayColor="primary"
        overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Display package details if selected or customized */}
        {(selectedPackage || selectedDestination || isCustomized) && (
          <div className="bg-card p-6 rounded-xl shadow-lg mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/3">
                <img
                  src={
                    selectedPackage?.image ||
                    selectedDestination?.image ||
                    "/placeholder.svg?height=300&width=400"
                  }
                  alt={
                    packageName ||
                    selectedPackage?.name ||
                    selectedDestination?.name ||
                    "Package"
                  }
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                {selectedPackage && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {packageName || selectedPackage.name}
                      {isCustomized && (
                        <span className="ml-2 text-sm bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-2 py-1 rounded-full">
                          Customized
                        </span>
                      )}
                    </h2>

                    {selectedPackage.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {selectedPackage.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {customDuration || selectedPackage.duration} days
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedPackage.destinations.join(", ")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Hotel className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {customAccommodation || selectedPackage.accommodation}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {customMeals || selectedPackage.meals}
                        </span>
                      </div>
                    </div>

                    {!isCustomized && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                            <CheckSquare className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                            Inclusions
                          </h3>
                          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                            {selectedPackage.inclusions.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                            <XSquare className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                            Exclusions
                          </h3>
                          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                            {selectedPackage.exclusions.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedDestination && !selectedPackage && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedDestination.name}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {selectedDestination.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedDestination.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Best time: {selectedDestination.bestTimeToVisit}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star
                          className="h-5 w-5 text-yellow-400 mr-1"
                          fill="currentColor"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedDestination.rating} (
                          {selectedDestination.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedDestination.activities.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        Highlights:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        {selectedDestination.highlights
                          .slice(0, 4)
                          .map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}

                {isCustomized && (
                  <div className="mb-4">
                    {customActivities && (
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Activities:
                        </h3>
                        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm">
                          {formData.customActivities &&
                            formData.customActivities.map((activity, index) => (
                              <li key={index}>{activity}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center text-2xl font-bold text-primary dark:text-primary-400 mb-4">
                  $
                  {customPrice || selectedPackage?.price || getEstimatedPrice()}{" "}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                    per person
                  </span>
                </div>
                <Link
                  href={selectedPackage ? "/packages" : "/destinations"}
                  className="flex items-center text-primary dark:text-primary-400 hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to {selectedPackage ? "packages" : "destinations"}
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden">
          {/* Booking Steps Progress */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between">
              <div
                className={`flex flex-col items-center ${
                  bookingStep >= 1
                    ? "text-primary dark:text-primary-400"
                    : "text-gray-400"
                }`}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    bookingStep >= 1
                      ? "border-primary dark:border-primary-400"
                      : "border-gray-300"
                  } mb-1`}>
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  Trip Details
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div
                  className={`flex-1 h-1 ${
                    bookingStep >= 2
                      ? "bg-primary dark:bg-primary-400"
                      : "bg-gray-300"
                  }`}></div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  bookingStep >= 2
                    ? "text-primary dark:text-primary-400"
                    : "text-gray-400"
                }`}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    bookingStep >= 2
                      ? "border-primary dark:border-primary-400"
                      : "border-gray-300"
                  } mb-1`}>
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  Personal Info
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div
                  className={`flex-1 h-1 ${
                    bookingStep >= 3
                      ? "bg-primary dark:bg-primary-400"
                      : "bg-gray-300"
                  }`}></div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  bookingStep >= 3
                    ? "text-primary dark:text-primary-400"
                    : "text-gray-400"
                }`}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    bookingStep >= 3
                      ? "border-primary dark:border-primary-400"
                      : "border-gray-300"
                  } mb-1`}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  Confirmation
                </span>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Step 1: Trip Details */}
              {bookingStep === 1 && (
                <div className="space-y-6">
                  {!selectedPackage &&
                    !selectedDestination &&
                    !isCustomized && (
                      <div>
                        <label
                          htmlFor="destination"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Destination
                        </label>
                        <select
                          id="destination"
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          required>
                          <option value="">Select a destination</option>
                          {destinationOptions.map((destination) => (
                            <option
                              key={destination.value}
                              value={destination.value}>
                              {destination.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="departureDate"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Departure Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="departureDate"
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                        <CalendarDays className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="returnDate"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Return Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="returnDate"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                        <CalendarDays className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="adults"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Adults (18+)
                      </label>
                      <input
                        type="number"
                        id="adults"
                        name="adults"
                        min="1"
                        max="10"
                        value={formData.adults}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="children"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Children (0-17)
                      </label>
                      <input
                        type="number"
                        id="children"
                        name="children"
                        min="0"
                        max="10"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {!isCustomized && (
                    <>
                      <div>
                        <label
                          htmlFor="roomType"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Accommodation Type
                        </label>
                        <select
                          id="roomType"
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                          required>
                          {roomTypes.map((room) => (
                            <option key={room.value} value={room.value}>
                              {room.label} - {room.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Activities & Experiences (Optional)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activities.map((activity) => (
                            <label
                              key={activity.id}
                              className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name={activity.id}
                                checked={formData.activities.includes(
                                  activity.id
                                )}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                              <span className="text-gray-700 dark:text-gray-300">
                                {activity.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Personal Information */}
              {bookingStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="specialRequests"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Booking Summary
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Destination:
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {selectedDestination?.name ||
                            selectedPackage?.destinations.join(", ") ||
                            formData.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Dates:
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {formData.departureDate && formData.returnDate
                            ? `${formData.departureDate} to ${formData.returnDate}`
                            : "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Travelers:
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {formData.adults} Adult
                          {formData.adults !== 1 ? "s" : ""}
                          {formData.children > 0
                            ? `, ${formData.children} Child${
                                formData.children !== 1 ? "ren" : ""
                              }`
                            : ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Price per person:
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          $
                          {customPrice ||
                            selectedPackage?.price ||
                            getEstimatedPrice()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {bookingStep === 3 && (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
                      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for your booking. We've sent a confirmation to{" "}
                    {formData.email}.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-left max-w-md mx-auto">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Booking Details
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex justify-between">
                        <span>Booking Reference:</span>
                        <span className="font-medium">#TRV283947</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Destination:</span>
                        <span>
                          {selectedDestination?.name ||
                            selectedPackage?.destinations.join(", ") ||
                            formData.destination}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dates:</span>
                        <span>
                          {formData.departureDate} - {formData.returnDate}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Travelers:</span>
                        <span>
                          {formData.adults} Adult
                          {formData.adults !== 1 ? "s" : ""}
                          {formData.children > 0
                            ? `, ${formData.children} Child${
                                formData.children !== 1 ? "ren" : ""
                              }`
                            : ""}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-medium">
                          $
                          {(Number(customPrice) ||
                            Number(selectedPackage?.price) ||
                            getEstimatedPrice()) * formData.adults}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Proceed to payment to complete your booking.
                    </p>
                    <Link
                      href="/pay"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Pay Now
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Form Navigation Buttons */}
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-xl flex justify-between">
              {bookingStep > 1 && bookingStep < 3 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  Back
                </button>
              ) : (
                <div></div> // Empty div to maintain the space
              )}

              {bookingStep < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  Next
                </button>
              ) : bookingStep === 2 ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  Confirm Booking
                </button>
              ) : (
                <Link
                  href="/"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  Return to Home
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
