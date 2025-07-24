"use client";

import Link from "next/link";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link
        href="/book"
        className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
        Book Now
      </Link>
      <Link
        href="/contact"
        className="px-8 py-3 border-2 border-white font-medium rounded-lg hover:bg-white/10 transition-colors">
        Contact Us
      </Link>
    </div>
  );
}
