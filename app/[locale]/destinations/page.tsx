import DestinationsPageContent from "@/components/destinations/DestinationsPageContent";
import destinations from "@/data/destinations";
import { Destination } from "@/types/destinations/types";

export const revalidate = 21600;

async function getDestinations() {
  // const res = await fetch(`/api/destinations`, {
  //   next: { revalidate: 21600 },
  // });
  // if (!res.ok) throw new Error("Failed to fetch destinations");
  // return res.json();
  const data: any = destinations;
  return data;
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="pt-20 pb-16 bg-theme">
      <DestinationsPageContent destinations={destinations} />
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Search } from "lucide-react";
// import PageHeader from "@/components/PageHeader";
// import destinations from "@/data/destinations";
// import NoMatchesFound from "@/components/tours/NoMatchesFound";
// import DestinationCard from "@/components/destinations/DestinationCard";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function DestinationsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { translations } = useLanguage();

//   const filteredDestinations = destinations.filter(
//     (destination) =>
//       destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       destination.description
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       destination.nearestCity
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       destination.activities.some((activity) =>
//         activity.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//   );

//   const handleClearSearchTerm = () => {
//     setSearchTerm("");
//   };

//   return (
//     <div className="pt-20 pb-16 bg-theme">
//       <PageHeader
//         title={translations.exploreEthiopia}
//         subtitle={translations.destinationsPageSubtitle}
//         backgroundImage="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
//         overlayColor="primary"
//         overlayOpacity={0.7}>
//         <div className="relative max-w-xl mx-auto">
//           <input
//             type="text"
//             placeholder={translations.destinationSearchPlaceholder}
//             className="w-full p-4 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute right-4 top-4 text-gray-500" />
//         </div>
//       </PageHeader>

//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredDestinations.map((destination) => (
//             <DestinationCard key={destination.id} destination={destination} />
//           ))}
//         </div>

//         {filteredDestinations.length === 0 && (
//           <NoMatchesFound
//             btnText="Clear Search"
//             msg="No destinations found matching your search."
//             onClear={handleClearSearchTerm}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
