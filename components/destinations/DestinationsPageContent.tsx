"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DestinationCard from "@/components/destinations/DestinationCard";
import NoMatchesFound from "@/components/tours/NoMatchesFound";
import { useLanguage } from "@/contexts/LanguageContext";
import { Destination } from "@/types/destinations/types";

export default function DestinationsPageContent({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { translations } = useLanguage();

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.nearestCity
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.activities.some((a) =>
        a.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      {/* Search Header */}
      <PageHeader
        title={translations.exploreEthiopia}
        subtitle={translations.destinationsPageSubtitle}
        backgroundImage="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        overlayColor="primary"
        overlayOpacity={0.7}>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder={translations.destinationSearchPlaceholder}
            className="w-full p-4 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-4 text-gray-500" />
        </div>
      </PageHeader>

      {/* Destination Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <NoMatchesFound
            btnText={translations.clearSearch}
            msg={translations.noResultsFound}
            onClear={() => setSearchTerm("")}
          />
        )}
      </div>
    </>
  );
}
