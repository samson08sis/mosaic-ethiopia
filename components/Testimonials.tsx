"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Carousel from "./ui/carousel";
import useSWR from "swr";
import SectionHeader from "./SectionHeader";
import ReviewCard from "./home/ReviewCard";

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
            <ReviewCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
