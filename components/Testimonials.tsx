"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Carousel from "./ui/carousel";
import StarIcon from "./ui/svgs/StarSVG";

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
                  <StarIcon
                    key={i}
                    customStyle={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 italic font-sans">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
