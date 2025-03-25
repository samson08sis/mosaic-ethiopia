import { useLanguage } from "../contexts/LanguageContext"

export default function PopularDestinations() {
  const { translations } = useLanguage()

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      rating: 4.8,
      reviews: 230,
    },
    {
      id: 2,
      name: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      rating: 4.9,
      reviews: 312,
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 4,
      name: "Machu Picchu, Peru",
      image:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      rating: 4.9,
      reviews: 275,
    },
  ]

  return (
    <section id="destinations" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.popularDestinations || "Popular Destinations"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Explore our most sought-after destinations loved by travelers around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="ml-1">
                    {destination.rating} ({destination.reviews})
                  </span>
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
              <button className="mt-3 text-primary-600 dark:text-primary-400 hover:underline font-medium">
                View Packages
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

