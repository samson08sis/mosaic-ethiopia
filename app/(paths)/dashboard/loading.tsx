export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
        </div>

        {/* Profile Header Skeleton */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-6 mb-8 animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-64"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Quick Actions Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Bookings Skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
