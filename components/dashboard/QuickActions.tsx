"use client";

import {
  BookOpen,
  MapPin,
  Calendar,
  Settings,
  Plane,
  Camera,
  Gift,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Book New Trip",
    description: "Explore packages",
    icon: <BookOpen className="h-6 w-6" />,
    href: "/packages",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    title: "Explore Destinations",
    description: "Discover places",
    icon: <MapPin className="h-6 w-6" />,
    href: "/destinations",
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
  {
    title: "My Bookings",
    description: "View all trips",
    icon: <Calendar className="h-6 w-6" />,
    href: "/bookings",
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
  },
  {
    title: "Profile Settings",
    description: "Update info",
    icon: <Settings className="h-6 w-6" />,
    href: "/profile",
    color: "from-orange-500 to-orange-600",
    hoverColor: "hover:from-orange-600 hover:to-orange-700",
  },
  {
    title: "Travel Journal",
    description: "Document trips",
    icon: <Camera className="h-6 w-6" />,
    href: "/journal",
    color: "from-pink-500 to-pink-600",
    hoverColor: "hover:from-pink-600 hover:to-pink-700",
  },
  {
    title: "Loyalty Rewards",
    description: "Redeem points",
    icon: <Gift className="h-6 w-6" />,
    href: "/rewards",
    color: "from-yellow-500 to-yellow-600",
    hoverColor: "hover:from-yellow-600 hover:to-yellow-700",
  },
  {
    title: "Flight Status",
    description: "Check flights",
    icon: <Plane className="h-6 w-6" />,
    href: "/flights",
    color: "from-indigo-500 to-indigo-600",
    hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
  },
  {
    title: "Support",
    description: "Get help",
    icon: <MessageCircle className="h-6 w-6" />,
    href: "/contact-us",
    color: "from-teal-500 to-teal-600",
    hoverColor: "hover:from-teal-600 hover:to-teal-700",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`group relative bg-gradient-to-br ${action.color} ${action.hoverColor} text-white rounded-xl p-4 transition-all duration-200 hover:scale-105 hover:shadow-lg`}>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                {action.icon}
              </div>
              <div>
                <p className="font-semibold text-sm">{action.title}</p>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
