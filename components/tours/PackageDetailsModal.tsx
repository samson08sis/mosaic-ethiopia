import { Package } from "@/types/packages/type";
import { CalendarDays, Check, Clock, MapPin, X } from "lucide-react";
import Link from "next/link";

type PackageDetailsModalProps = {
  selectedPackage: Package;
  onClose: () => void;
  onCustumizeClicked: (pkg: Package) => void;
};

export default function PackageDetailsModal({
  selectedPackage,
  onClose,
  onCustumizeClicked,
}: PackageDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="relative">
          <img
            src={
              selectedPackage.image || "/placeholder.svg?height=300&width=600"
            }
            alt={selectedPackage.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Close">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedPackage.name}
            </h2>
            <div className="flex items-center mt-2 md:mt-0">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${selectedPackage.price}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                / person
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {selectedPackage.duration} days
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {selectedPackage.destinations.length} destinations
              </span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                Available year-round
              </span>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Destinations
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {selectedPackage.destinations.map((destination, index) => (
                  <li key={index}>{destination}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Activities
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {selectedPackage.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Accommodation
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {selectedPackage.accommodationOptions.map((option) => (
                  <li key={option.id}>{option.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Meals
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {selectedPackage.mealOptions.map((option) => (
                  <li key={option.id}>{option.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                What's Included
              </h3>
              <ul className="space-y-2">
                {selectedPackage.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                What's Not Included
              </h3>
              <ul className="space-y-2">
                {selectedPackage.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/book?package=${selectedPackage.id}`}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-center">
              Book This Package
            </Link>
            <button
              onClick={() => {
                onClose();
                onCustumizeClicked(selectedPackage);
              }}
              className="flex-1 px-6 py-3 border border-primary text-primary hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              Customize Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
