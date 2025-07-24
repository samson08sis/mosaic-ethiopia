"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import BookingContent from "@/components/bookings/Content";

export default function CurrentBookings() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Current Bookings
      </h1>
      <BookingProvider>
        <BookingContent />
      </BookingProvider>
    </div>
  );
}
