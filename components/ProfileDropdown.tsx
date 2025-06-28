"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  Calendar,
  Clock,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const iconClass = "h-4 w-4 mr-2 text-gray-500 dark:text-gray-400";
const menuItems = [
  {
    href: "/dashboard",
    icon: <LayoutDashboard className={iconClass} />,
    text: "Dashboard",
    translation: "dashboard",
  },
  {
    href: "/profile",
    icon: <Settings className={iconClass} />,
    text: "Profile Settings",
    translation: "profileSettings",
  },
  {
    href: "/bookings/current",
    icon: <Calendar className={iconClass} />,
    text: "Current Bookings",
    translation: "currentBookings",
  },
  {
    href: "/bookings/history",
    icon: <Clock className={iconClass} />,
    text: "Booking History",
    translation: "bookingHistory",
  },
];

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const { translations } = useLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true">
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-primary-600" />
          )}
        </div>
        <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
          {user?.name.split(" ")[0] || "User"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>

          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}>
              {item.icon}
              {(translations as any)[item.translation] || item.text}
            </Link>
          ))}

          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <LogOut className="h-4 w-4 mr-2" />
            {translations.signOut || "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
