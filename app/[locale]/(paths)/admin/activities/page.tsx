"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useTheme } from "@/contexts/ThemeContext"
import { mockActivities, activityCategories, difficultyLevels, type Activity } from "@/data/activities"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  Users,
  Clock,
  MapPin,
  DollarSign,
} from "lucide-react"

export default function ActivitiesPage() {
  const { theme } = useTheme()
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    const filtered = activities.filter((activity) => {
      const matchesSearch =
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && activity.isActive) ||
        (selectedStatus === "inactive" && !activity.isActive)
      const matchesDifficulty = selectedDifficulty === "all" || activity.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
    })

    // Sort activities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price":
          return a.price - b.price
        case "rating":
          return b.rating - a.rating
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [activities, searchTerm, selectedCategory, selectedStatus, selectedDifficulty, sortBy])

  const toggleActivityStatus = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) => (activity.id === id ? { ...activity, isActive: !activity.isActive } : activity)),
    )
  }

  const deleteActivity = (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      setActivities((prev) => prev.filter((activity) => activity.id !== id))
    }
  }

  const getDifficultyStyle = (difficulty: string) => {
    const level = difficultyLevels.find((d) => d.value === difficulty)
    return level ? level.color : "bg-gray-100 text-gray-800"
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="p-6">
        {/* Header */}
        <div
          className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border p-6 mb-6`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Activity Management
              </h1>
              <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Manage all activities, tours, and experiences
              </p>
            </div>
            <Link
              href="/admin/activities/new"
              className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Activity
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div
          className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border p-6 mb-6`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="all">All Categories</option>
              {activityCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="created">Sort by Date</option>
            </select>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Total: {activities.length} activities
            </span>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Active: {activities.filter((a) => a.isActive).length}
            </span>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Inactive: {activities.filter((a) => !a.isActive).length}
            </span>
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Showing: {filteredActivities.length} results
            </span>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border overflow-hidden hover:shadow-lg transition-shadow`}
            >
              {/* Activity Image */}
              <div className="relative h-48">
                <img
                  src={activity.images[0] || "/placeholder.svg"}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(activity.difficulty)}`}
                  >
                    {activity.difficulty}
                  </span>
                  {activity.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleActivityStatus(activity.id)}
                    className={`p-1 rounded-full ${activity.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  >
                    {activity.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Activity Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {activity.name}
                  </h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      activity.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {activity.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <p className={`text-sm mb-3 line-clamp-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {activity.description}
                </p>

                {/* Activity Details */}
                <div className="space-y-2 mb-4">
                  <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <MapPin className="w-4 h-4 mr-2" />
                    {activity.location}
                  </div>
                  <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <Clock className="w-4 h-4 mr-2" />
                    {activity.duration}
                  </div>
                  <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <Users className="w-4 h-4 mr-2" />
                    Max {activity.maxParticipants} participants
                  </div>
                  <div className={`flex items-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    <DollarSign className="w-4 h-4 mr-2" />${activity.price}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`ml-1 text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {activity.rating}
                    </span>
                  </div>
                  <span className={`ml-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    ({activity.reviewCount} reviews)
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/activities/${activity.id}`}
                    className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                  <Link
                    href={`/admin/activities/${activity.id}/edit`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteActivity(activity.id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div
            className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border p-12 text-center`}
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <Search className={`w-8 h-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            </div>
            <h3 className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              No activities found
            </h3>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
              Try adjusting your search criteria or create a new activity.
            </p>
            <Link
              href="/admin/activities/new"
              className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Activity
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
