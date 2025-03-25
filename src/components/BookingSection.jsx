"use client"

import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { CalendarDays, Users, MapPin, CreditCard, DollarSign, CheckCircle } from "lucide-react"

export default function BookingSection() {
  const { translations } = useLanguage()
  const [bookingStep, setBookingStep] = useState(1)
  const [formData, setFormData] = useState({
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 2,
    children: 0,
    roomType: "standard",
    activities: [],
    name: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const destinations = [
    { value: "bali", label: "Bali, Indonesia" },
    { value: "santorini", label: "Santorini, Greece" },
    { value: "kyoto", label: "Kyoto, Japan" },
    { value: "machu-picchu", label: "Machu Picchu, Peru" },
    { value: "rome", label: "Rome, Italy" },
    { value: "paris", label: "Paris, France" },
  ]

  const activities = [
    { id: "sightseeing", label: "Sightseeing Tours" },
    { id: "adventure", label: "Adventure Activities" },
    { id: "food", label: "Food & Culinary Experiences" },
    { id: "cultural", label: "Cultural Workshops" },
    { id: "relaxation", label: "Spa & Relaxation" },
  ]

  const roomTypes = [
    { value: "standard", label: "Standard Room", price: "$120/night" },
    { value: "deluxe", label: "Deluxe Room", price: "$200/night" },
    { value: "suite", label: "Luxury Suite", price: "$350/night" },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          activities: [...formData.activities, name],
        })
      } else {
        setFormData({
          ...formData,
          activities: formData.activities.filter((activity) => activity !== name),
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const nextStep = () => {
    setBookingStep(bookingStep + 1)
  }

  const prevStep = () => {
    setBookingStep(bookingStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would submit the booking to a server
    // For this demo, we'll just move to a confirmation step
    setBookingStep(4)
  }

  return (
    <section id="booking" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.bookYourTrip || "Book Your Trip"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Ready for an unforgettable journey? Book your next adventure with us in just a few steps.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Booking Steps Progress */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-between">
            <div
              className={`flex flex-col items-center ${bookingStep >= 1 ? "text-primary-600 dark:text-primary-400" : "text-gray-400"}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${bookingStep >= 1 ? "border-primary-600 dark:border-primary-400" : "border-gray-300"} mb-1`}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium hidden sm:block">Trip Details</span>
            </div>
            <div className="flex-1 flex items-center">
              <div
                className={`flex-1 h-1 ${bookingStep >= 2 ? "bg-primary-600 dark:bg-primary-400" : "bg-gray-300"}`}
              ></div>
            </div>
            <div
              className={`flex flex-col items-center ${bookingStep >= 2 ? "text-primary-600 dark:text-primary-400" : "text-gray-400"}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${bookingStep >= 2 ? "border-primary-600 dark:border-primary-400" : "border-gray-300"} mb-1`}
              >
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium hidden sm:block">Personal Info</span>
            </div>
            <div className="flex-1 flex items-center">
              <div
                className={`flex-1 h-1 ${bookingStep >= 3 ? "bg-primary-600 dark:bg-primary-400" : "bg-gray-300"}`}
              ></div>
            </div>
            <div
              className={`flex flex-col items-center ${bookingStep >= 3 ? "text-primary-600 dark:text-primary-400" : "text-gray-400"}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${bookingStep >= 3 ? "border-primary-600 dark:border-primary-400" : "border-gray-300"} mb-1`}
              >
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium hidden sm:block">Payment</span>
            </div>
            <div className="flex-1 flex items-center">
              <div
                className={`flex-1 h-1 ${bookingStep >= 4 ? "bg-primary-600 dark:bg-primary-400" : "bg-gray-300"}`}
              ></div>
            </div>
            <div
              className={`flex flex-col items-center ${bookingStep >= 4 ? "text-primary-600 dark:text-primary-400" : "text-gray-400"}`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${bookingStep >= 4 ? "border-primary-600 dark:border-primary-400" : "border-gray-300"} mb-1`}
              >
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium hidden sm:block">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Step 1: Trip Details */}
            {bookingStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="destination"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Destination
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a destination</option>
                      {destinations.map((destination) => (
                        <option key={destination.value} value={destination.value}>
                          {destination.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="roomType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Accommodation Type
                    </label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      {roomTypes.map((room) => (
                        <option key={room.value} value={room.value}>
                          {room.label} - {room.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="departureDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Departure Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="departureDate"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                      <CalendarDays className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="returnDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Return Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                      <CalendarDays className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="children"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
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
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activities & Experiences (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activities.map((activity) => (
                      <label key={activity.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={activity.id}
                          checked={formData.activities.includes(activity.id)}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{activity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {bookingStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Destination</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {destinations.find((d) => d.value === formData.destination)?.label || "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Dates</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formData.departureDate && formData.returnDate
                          ? `${formData.departureDate} to ${formData.returnDate}`
                          : "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Travelers</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formData.adults} Adult{formData.adults !== 1 ? "s" : ""}
                        {formData.children > 0
                          ? `, ${formData.children} Child${formData.children !== 1 ? "ren" : ""}`
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Accommodation</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {roomTypes.find((r) => r.value === formData.roomType)?.label || "Standard Room"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {bookingStep === 3 && (
              <div className="space-y-6">
                <div className="bg-primary-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
                    <h3 className="font-medium text-gray-900 dark:text-white">Total Price: $2,450</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Includes all taxes and fees</p>
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                    <CreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Security Code (CVV)
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">
                      privacy policy
                    </a>
                    .
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {bookingStep === 4 && (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-4">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for your booking. We've sent a confirmation to {formData.email}.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-left max-w-md mx-auto">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Booking Details</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex justify-between">
                      <span>Booking Reference:</span>
                      <span className="font-medium">#TRV283947</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Destination:</span>
                      <span>{destinations.find((d) => d.value === formData.destination)?.label || "Not selected"}</span>
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
                        {formData.adults} Adult{formData.adults !== 1 ? "s" : ""}
                        {formData.children > 0
                          ? `, ${formData.children} Child${formData.children !== 1 ? "ren" : ""}`
                          : ""}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-medium">$2,450</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Form Navigation Buttons */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-xl flex justify-between">
            {bookingStep > 1 && bookingStep < 4 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain the space
            )}

            {bookingStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Next
              </button>
            ) : bookingStep === 3 ? (
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Confirm & Pay
              </button>
            ) : (
              <a
                href="#"
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                View My Bookings
              </a>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

