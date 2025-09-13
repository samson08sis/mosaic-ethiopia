"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Carousel from "./ui/carousel";
import SectionHeader from "./SectionHeader";
import ReviewCard from "./home/ReviewCard";
import { useModal } from "@/contexts/ModalContext";
import { SparklesIcon } from "lucide-react";
import { Testimonial } from "@/types/types";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const { openModal } = useModal();
  const { translations } = useLanguage();

  return (
    <section className="pb-16">
      <div className="text-center mb-12">
        <SectionHeader>
          {translations.testimonials || "What Our Customers Say"}
        </SectionHeader>

        <button
          onClick={() => openModal("rate")}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
          <SparklesIcon className="w-5 h-5 text-white" />
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
            <ReviewCard key={crypto.randomUUID()} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
