"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Clock,
  Users,
  Plane,
  BookOpen,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import BookingCard from "@/components/dashboard/BookingCard";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import TrendingDestinations from "@/components/dashboard/TrendingDestinations";
import FeaturedPackages from "@/components/dashboard/FeaturedPackages";
import { Booking } from "@/types/bookings/types";

// Mock data for demonstration
const mockBookings: Booking[] = [
  {
    id: "1",
    packageName: "Historic Route Adventure",
    destination: "Lalibela, Ethiopia",
    startDate: "2024-02-15",
    endDate: "2024-02-22",
    status: "confirmed",
    image: "/placeholder.svg?height=200&width=300",
    daysRemaining: 25,
  },
  {
    id: "2",
    packageName: "Danakil Depression Expedition",
    destination: "Afar Region, Ethiopia",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    status: "pending",
    image: "/placeholder.svg?height=200&width=300",
    daysRemaining: 50,
  },
];

const mockStats = {
  totalBookings: 12,
  countriesVisited: 3,
  totalSpent: 8500,
  loyaltyPoints: 2340,
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [animatedStats, setAnimatedStats] = useState({
    totalBookings: 0,
    countriesVisited: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Animate stats on mount
  useEffect(() => {
    if (isAuthenticated) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats({
          totalBookings: Math.floor(mockStats.totalBookings * progress),
          countriesVisited: Math.floor(mockStats.countriesVisited * progress),
          totalSpent: Math.floor(mockStats.totalSpent * progress),
          loyaltyPoints: Math.floor(mockStats.loyaltyPoints * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats(mockStats);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isAuthenticated]);

  if (false) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const memberSince = new Date(2023, 5, 15).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="my-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Ready for your next adventure? Here's what's happening with your
            travels.
          </p>
        </div>

        {/* User Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-blue-100 flex items-center">
                  {user?.email}
                  {user?.verified ? (
                    <CheckCircle className="h-4 w-4 ml-2 text-green-300" />
                  ) : (
                    <AlertCircle className="h-4 w-4 ml-2 text-yellow-300" />
                  )}
                </p>
                <p className="text-blue-200 text-sm">
                  Member since {memberSince}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">Gold Member</span>
              </div>
              <p className="text-blue-200 text-sm">
                {animatedStats.loyaltyPoints.toLocaleString()} loyalty points
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Bookings"
            value={animatedStats.totalBookings}
            icon={<Calendar className="h-6 w-6" />}
            color="blue"
            change="+2 this month"
          />
          <StatsCard
            title="Countries Visited"
            value={animatedStats.countriesVisited}
            icon={<MapPin className="h-6 w-6" />}
            color="green"
            change="Ethiopia, Kenya, Tanzania"
          />
          <StatsCard
            title="Total Spent"
            value={`$${animatedStats.totalSpent.toLocaleString()}`}
            icon={<DollarSign className="h-6 w-6" />}
            color="purple"
            change="Great value!"
          />
          <StatsCard
            title="Loyalty Points"
            value={animatedStats.loyaltyPoints.toLocaleString()}
            icon={<Star className="h-6 w-6" />}
            color="orange"
            change="Redeem for discounts"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Current Bookings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Plane className="h-6 w-6 mr-2 text-primary-600" />
              Your Upcoming Adventures
            </h2>
            <Link
              href="/bookings/current"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All
              <TrendingUp className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {mockBookings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No upcoming trips
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ready to explore? Book your next adventure today!
              </p>
              <Link
                href="/packages"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Packages
              </Link>
            </div>
          )}
        </div>

        {/* Trending Destinations */}
        <TrendingDestinations />

        {/* Featured Packages */}
        <FeaturedPackages />

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary-600" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Booking confirmed for Historic Route Adventure
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                2 days ago
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Profile updated successfully
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                1 week ago
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Earned 500 loyalty points
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                2 weeks ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
