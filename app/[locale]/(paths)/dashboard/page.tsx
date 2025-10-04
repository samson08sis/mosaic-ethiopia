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
  Loader2,
  Edit3,
  Mail,
  MailCheck,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink"; //<LocalizedLink
import BookingCard from "@/components/dashboard/BookingCard";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import TrendingDestinations from "@/components/dashboard/TrendingDestinations";
import FeaturedPackages from "@/components/dashboard/FeaturedPackages";
import { Booking } from "@/types/bookings/types";
import { StatsCardProps } from "@/types/dashboard/stats/type.d";

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
  destinationsVisited: 3,
  totalSpent: 8500,
  loyaltyPoints: 2340,
};

type RecentActivity = {
  action: string;
  status: "1" | "2" | "3" | "";
  timeStamp: Date;
};

const recentActivities: RecentActivity[] = [
  { action: "Action performed", status: "", timeStamp: new Date() },
  {
    action: "Booking confirmed for Historic Route Adventure",
    status: "1",
    timeStamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    action: "Profile updated successfully",
    status: "2",
    timeStamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    action: "Earned 500 loyalty points",
    status: "3",
    timeStamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
];

export default function Dashboard() {
  const { user, loading, isAuthenticated, sendVerificationEmail } = useAuth();
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [animatedStats, setAnimatedStats] = useState({
    totalBookings: 0,
    destinationsVisited: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
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
          destinationsVisited: Math.floor(
            mockStats.destinationsVisited * progress
          ),
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

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    setVerificationMessage("");

    try {
      const result = await sendVerificationEmail();

      if (result.success) {
        setVerificationMessage("Verification email sent! Check your inbox.");
      } else {
        setVerificationMessage(
          result.message || "Failed to send verification email."
        );
      }
    } catch (error) {
      setVerificationMessage("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setVerificationMessage("");
    }, 8000);
  };

  const statsData: StatsCardProps[] = [
    {
      title: "Total Bookings",
      value: animatedStats.totalBookings,
      icon: <Calendar className="h-6 w-6" />,
      color: "blue",
      change: "+2 this month",
    },
    {
      title: "Destinations Visited",
      value: animatedStats.destinationsVisited,
      icon: <MapPin className="h-6 w-6" />,
      color: "green",
      change: "Danakil, Gondar, Addis Ababa",
    },
    {
      title: "Total Spent",
      value: `$${animatedStats.totalSpent.toFixed(2).toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: "purple",
      change: "Great value!",
    },
    {
      title: "Loyalty Points",
      value: animatedStats.loyaltyPoints.toLocaleString(),
      icon: <Star className="h-6 w-6" />,
      color: "orange",
      change: "Redeem for discounts",
    },
  ];

  const getColoredStatus = (statusCode: string) => {
    let icon;
    switch (statusCode) {
      case "1":
        icon = "bg-green-500";
        break;
      case "2":
        icon = "bg-blue-500";
        break;
      case "3":
        icon = "bg-purple-500";
        break;
      default:
        icon = "bg-gray-500";
        break;
    }

    return <div className={`w-2 h-2 ${icon} rounded-full`} />;
  };

  const getDuration = (timestamp: Date) => {
    const now: any = new Date();
    const time: any = new Date(timestamp);
    const diff = now - time;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
    if (weeks === 1) return "A week ago";
    if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    if (months === 1) return "A month ago";
    if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
    if (years === 1) return "A year ago";
    return `${years} year${years === 1 ? "" : "s"} ago`;
  };

  if (!isAuthenticated) {
    return null;
  }

  const memberSince = user
    ? new Date(user.joined).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : new Date().toLocaleDateString("en-US", {
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* User Info Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden ring-4 ring-white/30">
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
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-blue-100">{user?.email}</p>
                    {user?.verified ? (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-300" />
                        <span className="text-green-300 text-sm font-medium">
                          {/* Verified */}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-yellow-300" />
                        <span className="text-yellow-300 text-sm font-medium">
                          Unverified
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-blue-200 text-sm mt-1">
                    Member since {memberSince}
                  </p>

                  {/* Verification Message */}
                  {verificationMessage && (
                    <div className="mt-2 p-2 bg-white/20 rounded-lg">
                      <p className="text-sm text-white">
                        {verificationMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions and Status Section */}
              <div className="flex flex-col items-start lg:items-end space-y-4">
                {/* Member Status */}
                {/* <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-300" />
                  <span className="font-semibold">Gold Member</span>
                </div>
                <p className="text-blue-200 text-sm">
                  {animatedStats.loyaltyPoints.toLocaleString()} loyalty points
                </p> */}

                {/* Action Buttons */}
                {/*If no expanding buttons, use "flex-col sm:flex-row" instead*/}
                <div className="flex flex-row gap-3 w-full lg:w-auto">
                  {/* Verify Email Button - Only show if email is not verified */}
                  {!user?.verified && (
                    <button
                      onClick={handleVerifyEmail}
                      disabled={isVerifying}
                      className="flex items-center justify-center py-2 pl-3 pr-2 hover:pr-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg">
                      {isVerifying ? (
                        <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin" />
                      ) : (
                        <MailCheck className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="max-w-0 group-hover:max-w-[7rem] transition-[max-width,opacity] duration-300 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 ml-1.5">
                        {isVerifying ? "Sending..." : "Verify Email"}
                      </span>
                    </button>
                  )}
                  {/* Edit Profile Link */}
                  <LocalizedLink
                    href="/profile"
                    className="flex items-center justify-center py-2 pl-3 pr-2 hover:pr-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all duration-350 backdrop-blur-sm border border-white/30 group">
                    <Edit3 className="h-4 w-4 flex-shrink-0" />
                    <span className="max-w-0 group-hover:max-w-[7rem] transition-[max-width,opacity] duration-300 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 ml-1.5">
                      Edit Profile
                    </span>
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, i) => (
            <StatsCard
              key={crypto.randomUUID()}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              change={stat.change}
            />
          ))}
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
            <LocalizedLink
              href="/bookings"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All
              <TrendingUp className="h-4 w-4 ml-1" />
            </LocalizedLink>
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
              <LocalizedLink
                href="/packages"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Packages
              </LocalizedLink>
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
            {recentActivities.map((activity, i) => (
              <div
                key={crypto.randomUUID()}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="flex items-center space-x-3">
                  {/* Returns the status color component */}
                  {getColoredStatus(activity.status)}
                  <span className="text-gray-700 dark:text-gray-300">
                    {activity.action}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                    {getDuration(activity.timeStamp)}
                  </span>
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                  {`${activity.timeStamp.toDateString()} at ${activity.timeStamp.toLocaleTimeString()}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
