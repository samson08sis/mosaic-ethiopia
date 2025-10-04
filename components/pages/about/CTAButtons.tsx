"use client";

import LocalizedLink from "@/components/LocalizedLink";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <LocalizedLink
        href="/book"
        className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
        Book Now
      </LocalizedLink>
      <LocalizedLink
        href="/contact-us"
        className="px-8 py-3 border-2 border-white font-medium rounded-lg hover:bg-white/10 transition-colors">
        Contact Us
      </LocalizedLink>
    </div>
  );
}
