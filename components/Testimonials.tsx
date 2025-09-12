"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Carousel from "./ui/carousel";
import StarIcon from "./ui/svgs/StarSVG";
import useSWR from "swr";
import SectionHeader from "./SectionHeader";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Testimonials({ initialData }: { initialData: any[] }) {
  const { translations } = useLanguage();

  const { data: testimonials = [] } = useSWR(
    "/api/reviews/recent",
    fetcher,
    { fallbackData: initialData, refreshInterval: 1800000 } // 30 mins
  );

  return (
    <section className="pb-16">
      <div className="text-center mb-12">
        <SectionHeader>
          {translations.testimonials || "What Our Customers Say"}
        </SectionHeader>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Carousel
          className="px-4 sm:px-8"
          autoPlay={true}
          itemsPerView={3}
          autoPlayInterval={6000}>
          {testimonials.map((testimonial: any) => (
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
