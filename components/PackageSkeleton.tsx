import { Clock, MapPin, Users } from "lucide-react";

const iconClassName = "h-5 w-5 mr-2 text-gray-300 dark:text-gray-600";
const details = [
  { icon: <Clock className={iconClassName} />, w: "w-1/2" },
  { icon: <MapPin className={iconClassName} />, w: "w-3/4" },
  { icon: <Users className={iconClassName} />, w: "w-1/3" },
];

export function PackagesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Image placeholder with shimmer */}
          <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div className="animate-pulse w-full h-full" />
          </div>

          <div className="p-6">
            {/* Title */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4 animate-pulse" />

            {/* Details */}
            <div className="flex flex-col space-y-3 mb-5">
              {details.map((item, i) => (
                <div key={i} className="flex items-center">
                  {item.icon}
                  <div
                    className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${item.w} animate-pulse`}
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-3">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-10 bg-gray-100 dark:bg-gray-600 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
