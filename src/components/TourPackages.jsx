"use client"

import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { Clock, MapPin, Users, CalendarDays, Check, X } from "lucide-react"

export default function TourPackages() {
  const { translations } = useLanguage()
  const [selectedPackage, setSelectedPackage] = useState(null)

  const packages = [
    {
      id: 1,
      name: "Bali Adventure",
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      price: 1299,
      duration: 7,
      destinations: ["Ubud", "Kuta", "Nusa Penida"],
      activities: ["Snorkeling", "Temple Visit", "Rice Terrace Trek"],
      accommodation: "Luxury Resort",
      meals: "Breakfast and Dinner",
      inclusions: ["Airport transfers", "Guided tours", "Travel insurance", "Welcome dinner"],
      exclusions: ["International flights", "Personal expenses", "Additional activities"],
    },
    {
      id: 2,
      name: "Greek Island Hopping",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      price: 1799,
      duration: 10,
      destinations: ["Athens", "Santorini", "Mykonos"],
      activities: ["Sightseeing", "Boat Tour", "Wine Tasting"],
      accommodation: "Boutique Hotels",
      meals: "All Inclusive",
      inclusions: ["Ferry transfers", "Guided tours", "Travel insurance", "All meals"],
      exclusions: ["International flights", "Personal expenses", "Optional activities"],
    },
    {
      id: 3,
      name: "Japan Cultural Experience",
      image:
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      price: 2299,
      duration: 12,
      destinations: ["Tokyo", "Kyoto", "Osaka"],
      activities: ["Temple Visits", "Tea Ceremony", "Cooking Class"],
      accommodation: "Traditional Ryokan & Hotels",
      meals: "Breakfast and Welcome Dinner",
      inclusions: ["Bullet train passes", "Cultural workshops", "Local guide", "Museum entries"],
      exclusions: ["International flights", "Most meals", "Optional activities", "Personal expenses"],
    },
  ]

  const openPackageDetails = (id) => {
    setSelectedPackage(packages.find((pkg) => pkg.id === id))
  }

  const closePackageDetails = () => {
    setSelectedPackage(null)
  }

  return (
    <section id="packages" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.customizablePackages || "Customizable Packages"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Create your perfect trip with our customizable packages. Tailor your journey to match your preferences and
          interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-1 rounded-full font-medium">
                ${pkg.price}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>

              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{pkg.duration} days</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{pkg.destinations.join(", ")}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Users className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Max 15 travelers</span>
                </div>
              </div>

              <button
                onClick={() => openPackageDetails(pkg.id)}
                className="w-full mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <img
                src={selectedPackage.image || "/placeholder.svg"}
                alt={selectedPackage.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closePackageDetails}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPackage.name}</h2>
                <div className="flex items-center mt-2 md:mt-0">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    ${selectedPackage.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">/ person</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{selectedPackage.duration} days</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedPackage.destinations.length} destinations
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Available year-round</span>
                </div>
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Destinations</h3>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {selectedPackage.destinations.map((destination, index) => (
                      <li key={index}>{destination}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Activities</h3>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {selectedPackage.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Accommodation</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedPackage.accommodation}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Meals</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedPackage.meals}</p>
                </div>
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">What's Included</h3>
                  <ul className="space-y-2">
                    {selectedPackage.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">What's Not Included</h3>
                  <ul className="space-y-2">
                    {selectedPackage.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <X className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  Book This Package
                </button>
                <button className="flex-1 px-6 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  Customize Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

