"use client";

import { useState } from "react";
import { Clock, MapPin, Users, Filter, Check, Edit } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import packages from "@/data/packages";
import NoMatchesFound from "@/components/tours/NoMatchesFound";
import { Package } from "@/types/packages/type";
import PackageDetailsModal from "@/components/tours/PackageDetailsModal";
import CustomizePackageModal from "@/components/tours/PackageCustomizationModal";
import PackageFilters from "@/components/tours/PackageFilters";

export default function PackagesPage() {
  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [customizingPackage, setCustomizingPackage] = useState<Package | null>(
    null
  );

  // Filter packages based on selected filters
  const filteredPackages = packages.filter((pkg) => {
    // Price filter
    if (priceFilter === "under1500" && pkg.price >= 1500) return false;
    if (priceFilter === "1500to2500" && (pkg.price < 1500 || pkg.price > 2500))
      return false;
    if (priceFilter === "over2500" && pkg.price <= 2500) return false;

    // Duration filter
    if (durationFilter === "short" && pkg.duration > 7) return false;
    if (durationFilter === "medium" && (pkg.duration <= 7 || pkg.duration > 14))
      return false;
    if (durationFilter === "long" && pkg.duration <= 14) return false;

    return true;
  });

  const openPackageDetails = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCustomizingPackage(null);
  };

  const closePackageDetails = () => {
    setSelectedPackage(null);
  };

  const openCustomizePackage = (pkg: Package) => {
    setCustomizingPackage(pkg);
    setSelectedPackage(null);
  };

  const closeCustomizePackage = () => {
    setCustomizingPackage(null);
  };

  const handleClearFilters = () => {
    setPriceFilter("all");
    setDurationFilter("all");
  };

  return (
    <div className="pt-20 pb-16 bg-theme">
      <PageHeader
        title="Tour Packages"
        subtitle="Discover our carefully curated tour packages designed to provide unforgettable travel experiences. All packages are fully customizable to match your preferences."
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        overlayColor="primary"
        overlayOpacity={0.7}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Filter className="h-5 w-5 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </PageHeader>

      {showFilters && (
        <PackageFilters
          price={priceFilter}
          duration={durationFilter}
          onPriceToggled={setPriceFilter}
          onDurationToggled={setDurationFilter}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image || "/placeholder.svg?height=300&width=400"}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-medium">
                  ${pkg.price}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {pkg.name}
                </h2>

                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>{pkg.duration} days</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>{pkg.destinations.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Users className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>Max 15 travelers</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Highlights:
                  </h3>
                  <ul className="space-y-1">
                    {pkg.activities.slice(0, 3).map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {activity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => openPackageDetails(pkg)}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                    View Details
                  </button>
                  <button
                    onClick={() => openCustomizePackage(pkg)}
                    className="w-full px-4 py-2 border border-primary text-primary hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Edit className="h-4 w-4 inline mr-2" />
                    Customize Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <NoMatchesFound
            onClear={handleClearFilters}
            msg="No packages found matching your filters."
            btnText="Clear Filters"
          />
        )}
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <PackageDetailsModal
          onClose={closePackageDetails}
          onCustumizeClicked={openCustomizePackage}
          selectedPackage={selectedPackage}
        />
      )}

      {/* Customize Package Modal */}
      {customizingPackage && (
        <CustomizePackageModal
          customizingPackage={customizingPackage}
          onClose={closeCustomizePackage}
        />
      )}
    </div>
  );
}
