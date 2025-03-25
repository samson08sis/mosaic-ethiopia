"use client"

import { useState } from "react"
import { Clock, MapPin, Users, Filter, Check, X, Plus, Minus, Edit, CalendarDays } from "lucide-react"
import Link from "next/link"

export default function PackagesPage() {
  const [priceFilter, setPriceFilter] = useState("all")
  const [durationFilter, setDurationFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [customizingPackage, setCustomizingPackage] = useState(null)
  const [customizations, setCustomizations] = useState({
    duration: 0,
    activities: [],
    selectedActivities: [],
    accommodation: "",
    meals: "",
  })

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
      additionalActivities: [
        {
          id: "surf",
          name: "Surfing Lessons",
          price: 120,
          description: "2-hour surfing lesson with professional instructor",
        },
        {
          id: "spa",
          name: "Balinese Spa Treatment",
          price: 80,
          description: "Traditional Balinese massage and spa treatment",
        },
        { id: "cooking", name: "Cooking Class", price: 65, description: "Learn to cook traditional Balinese dishes" },
        {
          id: "rafting",
          name: "White Water Rafting",
          price: 95,
          description: "Exciting rafting adventure on the Ayung River",
        },
      ],
      accommodationOptions: [
        { id: "standard", name: "Standard Resort", price: 0, description: "Included in package price" },
        { id: "deluxe", name: "Deluxe Resort", price: 250, description: "Upgrade to deluxe resort with private pool" },
        { id: "villa", name: "Private Villa", price: 500, description: "Exclusive private villa with butler service" },
      ],
      mealOptions: [
        { id: "breakfast", name: "Breakfast Only", price: -100, description: "Reduce package price" },
        { id: "half", name: "Breakfast and Dinner", price: 0, description: "Included in package price" },
        { id: "full", name: "All Inclusive", price: 200, description: "All meals and select drinks included" },
      ],
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
      additionalActivities: [
        {
          id: "sailing",
          name: "Private Sailing Trip",
          price: 180,
          description: "Full-day private sailing around the islands",
        },
        {
          id: "cooking",
          name: "Greek Cooking Class",
          price: 75,
          description: "Learn to cook traditional Greek dishes",
        },
        {
          id: "photo",
          name: "Photography Tour",
          price: 90,
          description: "Guided photography tour of the most scenic spots",
        },
        {
          id: "scuba",
          name: "Scuba Diving",
          price: 130,
          description: "Discover the underwater world of the Aegean Sea",
        },
      ],
      accommodationOptions: [
        { id: "standard", name: "Boutique Hotels", price: 0, description: "Included in package price" },
        { id: "luxury", name: "Luxury Hotels", price: 400, description: "Upgrade to 5-star luxury hotels" },
        { id: "villa", name: "Private Villas", price: 700, description: "Exclusive villas with sea views" },
      ],
      mealOptions: [
        { id: "breakfast", name: "Breakfast Only", price: -200, description: "Reduce package price" },
        { id: "half", name: "Half Board", price: -100, description: "Breakfast and dinner included" },
        { id: "full", name: "All Inclusive", price: 0, description: "Included in package price" },
      ],
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
      additionalActivities: [
        {
          id: "samurai",
          name: "Samurai Experience",
          price: 110,
          description: "Learn about samurai history and sword techniques",
        },
        { id: "anime", name: "Anime & Manga Tour", price: 85, description: "Visit famous anime locations and shops" },
        {
          id: "robot",
          name: "Robot Restaurant Show",
          price: 90,
          description: "Experience the famous Tokyo robot show",
        },
        {
          id: "sumo",
          name: "Sumo Wrestling Tour",
          price: 120,
          description: "Watch sumo practice and learn about the tradition",
        },
      ],
      accommodationOptions: [
        { id: "mixed", name: "Mixed Ryokan & Hotels", price: 0, description: "Included in package price" },
        {
          id: "ryokan",
          name: "Premium Ryokan",
          price: 350,
          description: "Stay exclusively in traditional premium ryokans",
        },
        { id: "luxury", name: "Luxury Hotels", price: 450, description: "Stay in 5-star luxury hotels throughout" },
      ],
      mealOptions: [
        { id: "basic", name: "Breakfast Only", price: -150, description: "Reduce package price" },
        { id: "standard", name: "Breakfast and Welcome Dinner", price: 0, description: "Included in package price" },
        {
          id: "gourmet",
          name: "Gourmet Experience",
          price: 400,
          description: "Includes selected fine dining experiences",
        },
      ],
    },
    {
      id: 4,
      name: "African Safari",
      image:
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2344&q=80",
      price: 3499,
      duration: 14,
      destinations: ["Serengeti", "Maasai Mara", "Ngorongoro"],
      activities: ["Game Drives", "Cultural Visits", "Hot Air Balloon"],
      accommodation: "Luxury Tented Camps & Lodges",
      meals: "All Inclusive",
      inclusions: ["Safari vehicles", "Park fees", "Expert guides", "All meals"],
      exclusions: ["International flights", "Visas", "Optional activities", "Personal expenses"],
      additionalActivities: [
        {
          id: "balloon",
          name: "Hot Air Balloon Safari",
          price: 450,
          description: "Sunrise hot air balloon safari over the plains",
        },
        {
          id: "photo",
          name: "Photography Safari",
          price: 200,
          description: "Specialized photography safari with expert guide",
        },
        { id: "walking", name: "Walking Safari", price: 150, description: "Guided walking safari with armed ranger" },
        { id: "night", name: "Night Game Drive", price: 180, description: "Experience the savanna after dark" },
      ],
      accommodationOptions: [
        { id: "standard", name: "Luxury Tented Camps", price: 0, description: "Included in package price" },
        { id: "premium", name: "Premium Lodges", price: 600, description: "Upgrade to premium safari lodges" },
        { id: "exclusive", name: "Exclusive Camps", price: 1200, description: "Ultra-luxury private camps" },
      ],
      mealOptions: [
        { id: "full", name: "All Inclusive", price: 0, description: "Included in package price" },
        {
          id: "gourmet",
          name: "Gourmet Safari",
          price: 300,
          description: "Premium dining experiences with wine pairings",
        },
      ],
    },
    {
      id: 5,
      name: "European Highlights",
      image:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      price: 2799,
      duration: 15,
      destinations: ["Paris", "Rome", "Barcelona", "Amsterdam"],
      activities: ["City Tours", "Museum Visits", "Culinary Experiences"],
      accommodation: "4-Star Hotels",
      meals: "Breakfast",
      inclusions: ["Train tickets", "City passes", "Guided tours", "Welcome dinner"],
      exclusions: ["International flights", "Most meals", "Optional activities"],
      additionalActivities: [
        {
          id: "louvre",
          name: "Private Louvre Tour",
          price: 120,
          description: "Skip-the-line private tour of the Louvre",
        },
        {
          id: "cooking",
          name: "Italian Cooking Class",
          price: 85,
          description: "Learn to make pasta and tiramisu in Rome",
        },
        {
          id: "flamenco",
          name: "Flamenco Show",
          price: 70,
          description: "Traditional flamenco show with dinner in Barcelona",
        },
        {
          id: "canal",
          name: "Private Canal Cruise",
          price: 95,
          description: "Private evening canal cruise in Amsterdam",
        },
      ],
      accommodationOptions: [
        { id: "standard", name: "4-Star Hotels", price: 0, description: "Included in package price" },
        { id: "boutique", name: "Boutique Hotels", price: 350, description: "Upgrade to charming boutique hotels" },
        { id: "luxury", name: "5-Star Luxury", price: 800, description: "Stay in 5-star luxury hotels throughout" },
      ],
      mealOptions: [
        { id: "breakfast", name: "Breakfast Only", price: 0, description: "Included in package price" },
        { id: "half", name: "Half Board", price: 450, description: "Add dinner at selected restaurants" },
        {
          id: "gourmet",
          name: "Gourmet Experience",
          price: 900,
          description: "Includes Michelin-starred dining experiences",
        },
      ],
    },
    {
      id: 6,
      name: "New Zealand Adventure",
      image:
        "https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
      price: 2599,
      duration: 12,
      destinations: ["Auckland", "Queenstown", "Rotorua", "Milford Sound"],
      activities: ["Hiking", "Bungee Jumping", "Boat Cruise", "Cultural Experience"],
      accommodation: "Mix of Hotels and Lodges",
      meals: "Breakfast and Some Dinners",
      inclusions: ["Domestic flights", "Activity fees", "National park entries"],
      exclusions: ["International flights", "Some meals", "Optional activities"],
      additionalActivities: [
        { id: "skydive", name: "Skydiving", price: 350, description: "Tandem skydive over Queenstown" },
        { id: "lotr", name: "Lord of the Rings Tour", price: 160, description: "Visit famous filming locations" },
        {
          id: "heli",
          name: "Helicopter Tour",
          price: 290,
          description: "Scenic helicopter flight with glacier landing",
        },
        { id: "kayak", name: "Sea Kayaking", price: 120, description: "Guided sea kayaking adventure" },
      ],
      accommodationOptions: [
        { id: "standard", name: "Mix of Hotels and Lodges", price: 0, description: "Included in package price" },
        { id: "premium", name: "Premium Lodges", price: 450, description: "Upgrade to premium lodges throughout" },
        { id: "luxury", name: "Luxury Retreats", price: 900, description: "Stay in exclusive luxury retreats" },
      ],
      mealOptions: [
        { id: "standard", name: "Breakfast and Some Dinners", price: 0, description: "Included in package price" },
        { id: "half", name: "Half Board", price: 250, description: "Add more dinners at selected restaurants" },
        { id: "full", name: "Full Board", price: 500, description: "All meals included" },
      ],
    },
  ]

  // Filter packages based on selected filters
  const filteredPackages = packages.filter((pkg) => {
    // Price filter
    if (priceFilter === "under1500" && pkg.price >= 1500) return false
    if (priceFilter === "1500to2500" && (pkg.price < 1500 || pkg.price > 2500)) return false
    if (priceFilter === "over2500" && pkg.price <= 2500) return false

    // Duration filter
    if (durationFilter === "short" && pkg.duration > 7) return false
    if (durationFilter === "medium" && (pkg.duration <= 7 || pkg.duration > 14)) return false
    if (durationFilter === "long" && pkg.duration <= 14) return false

    return true
  })

  const openPackageDetails = (pkg) => {
    setSelectedPackage(pkg)
    setCustomizingPackage(null)
  }

  const closePackageDetails = () => {
    setSelectedPackage(null)
  }

  const openCustomizePackage = (pkg) => {
    setCustomizingPackage(pkg)
    setCustomizations({
      duration: pkg.duration,
      activities: [...pkg.activities],
      selectedActivities: [],
      accommodation: pkg.accommodationOptions[0].id,
      meals: pkg.mealOptions[1] ? pkg.mealOptions[1].id : pkg.mealOptions[0].id,
    })
    setSelectedPackage(null)
  }

  const closeCustomizePackage = () => {
    setCustomizingPackage(null)
  }

  const handleDurationChange = (change) => {
    const newDuration = customizations.duration + change
    if (newDuration >= 3 && newDuration <= 21) {
      setCustomizations({
        ...customizations,
        duration: newDuration,
      })
    }
  }

  const toggleActivity = (activityId) => {
    const currentActivities = [...customizations.selectedActivities]
    const index = currentActivities.indexOf(activityId)

    if (index === -1) {
      currentActivities.push(activityId)
    } else {
      currentActivities.splice(index, 1)
    }

    setCustomizations({
      ...customizations,
      selectedActivities: currentActivities,
    })
  }

  const handleAccommodationChange = (e) => {
    setCustomizations({
      ...customizations,
      accommodation: e.target.value,
    })
  }

  const handleMealChange = (e) => {
    setCustomizations({
      ...customizations,
      meals: e.target.value,
    })
  }

  const calculateCustomPrice = () => {
    if (!customizingPackage) return 0

    // Base price
    let totalPrice = customizingPackage.price

    // Duration adjustment (assume 10% of base price per day)
    const durationDiff = customizations.duration - customizingPackage.duration
    totalPrice += totalPrice * 0.1 * durationDiff

    // Additional activities
    if (customizations.selectedActivities && customizations.selectedActivities.length > 0) {
      customizations.selectedActivities.forEach((activityId) => {
        const activity = customizingPackage.additionalActivities.find((a) => a.id === activityId)
        if (activity) {
          totalPrice += activity.price
        }
      })
    }

    // Accommodation upgrade
    const selectedAccommodation = customizingPackage.accommodationOptions.find(
      (a) => a.id === customizations.accommodation,
    )
    if (selectedAccommodation) {
      totalPrice += selectedAccommodation.price
    }

    // Meal plan
    const selectedMeal = customizingPackage.mealOptions.find((m) => m.id === customizations.meals)
    if (selectedMeal) {
      totalPrice += selectedMeal.price
    }

    return Math.round(totalPrice)
  }

  const getBookingUrl = () => {
    if (!customizingPackage) return ""

    const customPrice = calculateCustomPrice()
    const params = new URLSearchParams({
      package: customizingPackage.id,
      name: customizingPackage.name,
      duration: customizations.duration,
      price: customPrice,
      activities: JSON.stringify([
        ...customizingPackage.activities,
        ...customizations.selectedActivities
          .map((id) => {
            const activity = customizingPackage.additionalActivities.find((a) => a.id === id)
            return activity ? activity.name : ""
          })
          .filter((name) => name),
      ]),
      accommodation:
        customizingPackage.accommodationOptions.find((a) => a.id === customizations.accommodation)?.name || "",
      meals: customizingPackage.mealOptions.find((m) => m.id === customizations.meals)?.name || "",
    })

    return `/book?${params.toString()}`
  }

  return (
    <div className="pt-20 pb-16 bg-theme">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Tour Packages</h1>
          <p className="text-xl max-w-2xl mb-8">
            Discover our carefully curated tour packages designed to provide unforgettable travel experiences. All
            packages are fully customizable to match your preferences.
          </p>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-muted py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceFilter === "all"}
                      onChange={() => setPriceFilter("all")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">All Prices</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="under1500"
                      checked={priceFilter === "under1500"}
                      onChange={() => setPriceFilter("under1500")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Under $1,500</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="1500to2500"
                      checked={priceFilter === "1500to2500"}
                      onChange={() => setPriceFilter("1500to2500")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">$1,500 - $2,500</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value="over2500"
                      checked={priceFilter === "over2500"}
                      onChange={() => setPriceFilter("over2500")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Over $2,500</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Duration</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="all"
                      checked={durationFilter === "all"}
                      onChange={() => setDurationFilter("all")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">All Durations</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="short"
                      checked={durationFilter === "short"}
                      onChange={() => setDurationFilter("short")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Short (1-7 days)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="medium"
                      checked={durationFilter === "medium"}
                      onChange={() => setDurationFilter("medium")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Medium (8-14 days)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="long"
                      checked={durationFilter === "long"}
                      onChange={() => setDurationFilter("long")}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Long (15+ days)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image || "/placeholder.svg?height=300&width=400"}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-medium">
                  ${pkg.price}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{pkg.name}</h2>

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

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Highlights:</h3>
                  <ul className="space-y-1">
                    {pkg.activities.slice(0, 3).map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => openPackageDetails(pkg)}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => openCustomizePackage(pkg)}
                    className="w-full px-4 py-2 border border-primary text-primary hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4 inline mr-2" />
                    Customize Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">No packages found matching your filters.</p>
            <button
              onClick={() => {
                setPriceFilter("all")
                setDurationFilter("all")
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <img
                src={selectedPackage.image || "/placeholder.svg?height=300&width=600"}
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
                <Link
                  href={`/book?package=${selectedPackage.id}`}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-center"
                >
                  Book This Package
                </Link>
                <button
                  onClick={() => {
                    closePackageDetails()
                    openCustomizePackage(selectedPackage)
                  }}
                  className="flex-1 px-6 py-3 border border-primary text-primary hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Customize Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Package Modal */}
      {customizingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customize Your Package</h2>
                <button
                  onClick={closeCustomizePackage}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{customizingPackage.name}</h3>
                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  ${calculateCustomPrice()}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">/ person</span>
                </div>
              </div>

              {/* Duration Customization */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">Trip Duration</h4>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDurationChange(-1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    disabled={customizations.duration <= 3}
                  >
                    <Minus className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <div className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border-y border-gray-300 dark:border-gray-600 text-center min-w-[80px]">
                    <span className="font-medium text-gray-900 dark:text-white">{customizations.duration}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">days</span>
                  </div>
                  <button
                    onClick={() => handleDurationChange(1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    disabled={customizations.duration >= 21}
                  >
                    <Plus className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                    {customizations.duration !== customizingPackage.duration
                      ? customizations.duration > customizingPackage.duration
                        ? `+${customizations.duration - customizingPackage.duration} days from original`
                        : `-${customizingPackage.duration - customizations.duration} days from original`
                      : "Original duration"}
                  </span>
                </div>
              </div>

              {/* Additional Activities */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">Additional Activities</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Select additional activities to enhance your experience (extra charges apply)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {customizingPackage.additionalActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        customizations.selectedActivities?.includes(activity.id)
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                      }`}
                      onClick={() => toggleActivity(activity.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 dark:text-white">{activity.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 font-medium">+${activity.price}</div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Click to {customizations.selectedActivities?.includes(activity.id) ? "remove" : "add"}
                        </span>
                        {customizations.selectedActivities?.includes(activity.id) && (
                          <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation Options */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">Accommodation</h4>
                <div className="space-y-3">
                  {customizingPackage.accommodationOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
                        customizations.accommodation === option.id
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="accommodation"
                          value={option.id}
                          checked={customizations.accommodation === option.id}
                          onChange={handleAccommodationChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div className="ml-3 flex-1">
                          <h5 className="font-medium text-gray-900 dark:text-white">{option.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 font-medium">
                          {option.price === 0
                            ? "Included"
                            : option.price > 0
                              ? `+$${option.price}`
                              : `-$${Math.abs(option.price)}`}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meal Options */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">Meal Plan</h4>
                <div className="space-y-3">
                  {customizingPackage.mealOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
                        customizations.meals === option.id
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="meals"
                          value={option.id}
                          checked={customizations.meals === option.id}
                          onChange={handleMealChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div className="ml-3 flex-1">
                          <h5 className="font-medium text-gray-900 dark:text-white">{option.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 font-medium">
                          {option.price === 0
                            ? "Included"
                            : option.price > 0
                              ? `+$${option.price}`
                              : `-$${Math.abs(option.price)}`}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary and Actions */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customization Summary</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Base Package:</span>
                    <span className="font-medium text-gray-900 dark:text-white">${customizingPackage.price}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {customizations.duration} days
                      {customizations.duration !== customizingPackage.duration &&
                        ` (${customizations.duration > customizingPackage.duration ? "+" : "-"}$${Math.round(customizingPackage.price * 0.1 * Math.abs(customizations.duration - customizingPackage.duration))})`}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Additional Activities:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {customizations.selectedActivities?.length > 0
                        ? `+$${customizations.selectedActivities.reduce((total, id) => {
                            const activity = customizingPackage.additionalActivities.find((a) => a.id === id)
                            return total + (activity ? activity.price : 0)
                          }, 0)}`
                        : "None"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Accommodation:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {customizingPackage.accommodationOptions.find((a) => a.id === customizations.accommodation)
                        ?.name || "Standard"}
                      {(customizingPackage.accommodationOptions.find((a) => a.id === customizations.accommodation)
                        ?.price || 0) > 0 &&
                        ` (+$${customizingPackage.accommodationOptions.find((a) => a.id === customizations.accommodation)?.price})`}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Meals:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {customizingPackage.mealOptions.find((m) => m.id === customizations.meals)?.name || "Standard"}
                      {(customizingPackage.mealOptions.find((m) => m.id === customizations.meals)?.price || 0) !== 0 &&
                        ` (${(customizingPackage.mealOptions.find((m) => m.id === customizations.meals)?.price || 0) > 0 ? "+" : "-"}$${Math.abs(customizingPackage.mealOptions.find((m) => m.id === customizations.meals)?.price || 0)})`}
                    </span>
                  </li>
                  <li className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-gray-900 dark:text-white font-medium">Total Price:</span>
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      ${calculateCustomPrice()}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={getBookingUrl()}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-center"
                >
                  Book Customized Package
                </Link>
                <button
                  onClick={closeCustomizePackage}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

