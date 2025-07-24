"use client";
type Booking = {
  id: string;
  image: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  date: Date;
  price: number;
  guests?: number;
  service?: string;
  status: "confirmed" | "pending" | "cancelled";
};

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error?: string;
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

// Mock data for current bookings
const initialBookings: Booking[] = [
  {
    id: "book-1",
    destination: "Lalibela Rock Churches",
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    endDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000), // 22 days from now
    guests: 2,
    price: 1299,
    image: "/bg-6.jpg",
    status: "confirmed",
  },
  {
    id: "book-2",
    destination: "Simien Mountains Trek",
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    endDate: new Date(Date.now() + 52 * 24 * 60 * 60 * 1000), // 52 days from now
    guests: 1,
    price: 899,
    image: "/bg-12.jpg",
    status: "pending",
  },
];

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/bookings/me`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setBookings(initialBookings);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider value={{ bookings, loading, error }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
};
