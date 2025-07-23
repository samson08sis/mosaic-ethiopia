"use client";

import { StatsCardProps } from "@/types/dashboard/stats/type.t";

export default function StatsCard({
  title,
  value,
  icon,
  color,
  change,
}: StatsCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          icon: "text-blue-600 dark:text-blue-400",
          accent: "border-blue-200 dark:border-blue-800",
        };
      case "green":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          icon: "text-green-600 dark:text-green-400",
          accent: "border-green-200 dark:border-green-800",
        };
      case "purple":
        return {
          bg: "bg-purple-50 dark:bg-purple-900/20",
          icon: "text-purple-600 dark:text-purple-400",
          accent: "border-purple-200 dark:border-purple-800",
        };
      case "orange":
        return {
          bg: "bg-orange-50 dark:bg-orange-900/20",
          icon: "text-orange-600 dark:text-orange-400",
          accent: "border-orange-200 dark:border-orange-800",
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-900/20",
          icon: "text-gray-600 dark:text-gray-400",
          accent: "border-gray-200 dark:border-gray-800",
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 border ${colorClasses.accent} hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
          <div className={colorClasses.icon}>{icon}</div>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        {change && (
          <p className="text-xs text-gray-500 dark:text-gray-500">{change}</p>
        )}
      </div>
    </div>
  );
}
