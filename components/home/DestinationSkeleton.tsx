export function DestinationsSkeleton() {
  return (
    <section id="destinations" className="pb-16">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="mt-4 flex flex-col xl:flex-row gap-2">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                <div className="h-10 bg-gray-100 dark:bg-gray-600 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
