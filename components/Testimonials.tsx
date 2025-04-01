"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Carousel from "./ui/carousel";

export default function Testimonials() {
  const { translations } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United States",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      quote:
        "Our Ethiopian adventure was absolutely incredible! The historical sites in Lalibela left me speechless, and our guide was so knowledgeable. I'll never forget watching the sunrise over the Simien Mountains. Truly a life-changing experience!",
    },
    {
      id: 2,
      name: "David Chen",
      location: "Canada",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
      quote:
        "The cultural immersion on this tour was beyond my expectations. From coffee ceremonies to traditional music performances, every day brought new insights into Ethiopia's rich heritage. The accommodations were comfortable and the food was delicious!",
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "United Kingdom",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 5,
      quote:
        "As a solo female traveler, I felt completely safe and welcomed throughout my Ethiopian journey. The Danakil Depression was otherworldly, and the local interactions in the Omo Valley were respectful and authentic. I'm already planning my return!",
    },
    {
      id: 4,
      name: "Michael Thompson",
      location: "Australia",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4,
      quote:
        "Ethiopia surprised me in the best possible way. The coffee was incredible, the people were warm and welcoming, and the landscapes were unlike anything I've seen before. The tour was well-organized and our guide made the history come alive.",
    },
    {
      id: 5,
      name: "Sophia Rodriguez",
      location: "Spain",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      quote:
        "From the rock-hewn churches of Lalibela to the vibrant markets of Addis Ababa, every moment of our Ethiopian journey was filled with wonder. The local guides shared insights that you can't find in any guidebook. Highly recommend!",
    },
  ];

  return (
    <section className="pb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.testimonials || "What Our Customers Say"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Read about the experiences of travelers who have explored the world
          with us.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Carousel
          className="px-4 sm:px-8"
          autoPlay={true}
          itemsPerView={3}
          autoPlayInterval={6000}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
