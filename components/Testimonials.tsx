"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Carousel from "./ui/carousel";
import useSWR from "swr";
import SectionHeader from "./SectionHeader";
import ReviewCard from "./home/ReviewCard";
import { useModal } from "@/contexts/ModalContext";
import { SparklesIcon } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Testimonials({ initialData }: { initialData: any[] }) {
  const { openModal } = useModal();
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

        <button
          onClick={() => openModal("rate")}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
          {/* <MessageSquarePlus className="w-5 h-5" /> */}
          <SparklesIcon className="w-5 h-5 text-orange-500" />
          <span>Share Your Experience</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Carousel
          className="px-4 sm:px-8"
          autoPlay={true}
          itemsPerView={3}
          autoPlayInterval={6000}>
          {testimonials.map((testimonial: any) => (
            <ReviewCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
