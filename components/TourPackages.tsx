"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import packages from "@/data/packages";
import { useModal } from "@/contexts/ModalContext";
import PopularPackageCard from "./home/PopularPackagesCard";

export default function TourPackages() {
  const { translations } = useLanguage();
  const { openModal } = useModal();

  const openPackageDetails = (id: string) => {
    const pkg = packages.find((pkg) => pkg.id === id);
    if (!pkg) return;

    openModal("packageDetails", { selectedPackage: pkg });
  };

  const openCustomizePackage = (id: string) => {
    const pkg = packages.find((pkg) => pkg.id === id) || null;
    if (!pkg) return;

    openModal("customizePackage", { customizingPackage: pkg });
  };

  return (
    <section id="packages" className="pb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {translations.customizablePackages || "Ethiopian Tour Packages"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Create your perfect Ethiopian journey with our customizable packages.
          Tailor your adventure to match your preferences and interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Package cards */}
        {packages.map((pkg) => (
          <PopularPackageCard
            key={pkg.id}
            pkg={pkg}
            onPackageDetailsClicked={openPackageDetails}
            onCustomizePackageClicked={openCustomizePackage}
          />
        ))}
      </div>
    </section>
  );
}
