"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LocalizedLink from "@/components/LocalizedLink";
import { useTheme } from "@/contexts/ThemeContext";
import {
  mockActivities,
  difficultyLevels,
  type Activity,
} from "@/data/activities";
import {
  ArrowLeft,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  Users,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Share2,
} from "lucide-react";

export default function ActivityDetailPage() {
  const { theme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchActivity = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundActivity = mockActivities.find((a) => a.id === params.id);
      setActivity(foundActivity || null);
      setLoading(false);
    };

    fetchActivity();
  }, [params.id]);

  const toggleActivityStatus = () => {
    if (activity) {
      setActivity((prev) =>
        prev ? { ...prev, isActive: !prev.isActive } : null
      );
    }
  };

  const deleteActivity = () => {
    if (confirm("Are you sure you want to delete this activity?")) {
      router.push("/admin/activities");
    }
  };

  const getDifficultyStyle = (difficulty: string) => {
    const level = difficultyLevels.find((d) => d.value === difficulty);
    return level ? level.color : "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}>
        <div className="p-6">
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-lg border p-6`}>
            <div className="animate-pulse">
              <div
                className={`h-8 w-64 rounded mb-4 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}></div>
              <div
                className={`h-64 w-full rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}>
        <div className="p-6">
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } rounded-lg border p-12 text-center`}>
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}>
              <AlertTriangle
                className={`w-8 h-8 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <h3
              className={`text-lg font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
              Activity Not Found
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } mb-4`}>
              The activity you're looking for doesn't exist or has been removed.
            </p>
            <LocalizedLink
              href="/admin/activities"
              className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activities
            </LocalizedLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}>
      <div className="p-6">
        {/* Header */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-lg border p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LocalizedLink
                href="/admin/activities"
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}>
                <ArrowLeft className="w-5 h-5" />
              </LocalizedLink>
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                  {activity.name}
                </h1>
                <p
                  className={`mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Activity Details & Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleActivityStatus}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activity.isActive
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}>
                {activity.isActive ? (
                  <ToggleRight className="w-4 h-4 mr-2" />
                ) : (
                  <ToggleLeft className="w-4 h-4 mr-2" />
                )}
                {activity.isActive ? "Active" : "Inactive"}
              </button>
              <LocalizedLink
                href={`/admin/activities/${activity.id}/edit`}
                className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </LocalizedLink>
              <button
                onClick={deleteActivity}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Images */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border overflow-hidden`}>
              <div className="h-64 relative">
                <img
                  src={activity.images[0] || "/placeholder.svg"}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(
                      activity.difficulty
                    )}`}>
                    {activity.difficulty}
                  </span>
                  {activity.featured && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h2
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Category
                  </label>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } capitalize`}>
                    {activity.category}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Location
                  </label>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } flex items-center`}>
                    <MapPin className="w-4 h-4 mr-2" />
                    {activity.location}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Duration
                  </label>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } flex items-center`}>
                    <Clock className="w-4 h-4 mr-2" />
                    {activity.duration}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Price
                  </label>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } flex items-center font-semibold`}>
                    <DollarSign className="w-4 h-4 mr-2" />${activity.price}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Description
                </label>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } leading-relaxed`}>
                  {activity.description}
                </p>
              </div>
            </div>

            {/* Capacity & Requirements */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h2
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Capacity & Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Max Participants
                  </label>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } flex items-center`}>
                    <Users className="w-4 h-4 mr-2" />
                    {activity.maxParticipants} people
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Minimum Age
                  </label>
                  <p
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                    {activity.minAge} years old
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Requirements
                </label>
                <ul className="space-y-1">
                  {activity.requirements.map((req, index) => (
                    <li
                      key={index}
                      className={`flex items-center ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}>
                      <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Includes & Excludes */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h2
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                What's Included & Excluded
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className={`font-medium mb-3 text-green-700 ${
                      theme === "dark" ? "text-green-400" : "text-green-700"
                    }`}>
                    Includes
                  </h3>
                  <ul className="space-y-2">
                    {activity.includes.map((item, index) => (
                      <li
                        key={index}
                        className={`flex items-center ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className={`font-medium mb-3 ${
                      theme === "dark" ? "text-red-400" : "text-red-700"
                    }`}>
                    Excludes
                  </h3>
                  <ul className="space-y-2">
                    {activity.excludes.map((item, index) => (
                      <li
                        key={index}
                        className={`flex items-center ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
                        <XCircle className="w-4 h-4 mr-2 text-red-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Visibility
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      activity.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {activity.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Featured
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      activity.featured
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {activity.featured ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Performance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Rating
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                      {activity.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Reviews
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                    {activity.reviewCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Metadata
              </h3>
              <div className="space-y-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                    Created
                  </label>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    } flex items-center`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                    Last Updated
                  </label>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    {new Date(activity.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                    Created By
                  </label>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                    {activity.createdBy}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg border p-6`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  className={`w-full flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Activity
                </button>
                <button
                  className={`w-full flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
