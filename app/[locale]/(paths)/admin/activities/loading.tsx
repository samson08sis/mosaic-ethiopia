"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ActivitiesLoading() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}>
      <div className="p-6">
        {/* Header Skeleton */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-lg border p-6 mb-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div
                className={`h-8 w-64 rounded ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } animate-pulse`}></div>
              <div
                className={`h-4 w-96 rounded mt-2 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } animate-pulse`}></div>
            </div>
            <div
              className={`h-10 w-40 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              } animate-pulse`}></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-lg border p-6 mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-10 rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } animate-pulse`}></div>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 w-20 rounded ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } animate-pulse`}></div>
            ))}
          </div>
        </div>

        {/* Activities Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border overflow-hidden`}>
              <div
                className={`h-48 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                } animate-pulse`}></div>
              <div className="p-4">
                <div
                  className={`h-6 w-3/4 rounded mb-2 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  } animate-pulse`}></div>
                <div
                  className={`h-4 w-full rounded mb-1 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  } animate-pulse`}></div>
                <div
                  className={`h-4 w-2/3 rounded mb-3 ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  } animate-pulse`}></div>
                <div className="space-y-2 mb-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className={`h-4 w-full rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                      } animate-pulse`}></div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div
                    className={`flex-1 h-8 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } animate-pulse`}></div>
                  <div
                    className={`flex-1 h-8 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } animate-pulse`}></div>
                  <div
                    className={`w-8 h-8 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } animate-pulse`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
