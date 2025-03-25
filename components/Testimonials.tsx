"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function Testimonials() {
  const { translations } = useLanguage()

  const testimonials = [
    {
      id: 1,
      name: "Emma Thompson",
      location: "London, UK",
      rating: 5,
      quote:
        "Our trip to Bali was absolutely perfect! The travel itinerary was well-planned, the accommodations were top-notch, and our guide was incredibly knowledgeable. Will definitely book with them again!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      location: "Toronto, Canada",
      rating: 5,
      quote:
        "The customized tour package to Japan exceeded all our expectations. Every detail was taken care of, allowing us to fully immerse ourselves in the culture without worrying about logistics.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Sophie Chen",
      location: "Sydney, Australia",
      rating: 4,
      quote:
        "Greece was on my bucket list for years and this company made it a reality. The island hopping was seamless, and the local experiences they arranged were authentic and memorable.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.testimonials || "What Our Customers Say"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Read about the experiences of travelers who have explored the world with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
              </div>
            </div>

            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

