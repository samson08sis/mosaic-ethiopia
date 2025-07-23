import Image from "next/image";
import {
  Compass,
  Shield,
  Clock,
  Binoculars,
  Coffee,
  Utensils,
  Mountain,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { title } from "process";

export default function ImageFeatures() {
  const iconClass = "h-8 w-8 text-white";
  const features = [
    {
      id: 1,
      icon: <Shield className={iconClass} />,
      title: "Travel With Confidence",
      description:
        "Enjoy peace of mind with our comprehensive support, insurance, and safety measures throughout your journey.",
      image: "/bg-49.jpg",
      color: "#1089ff",
    },
    {
      id: 2,
      icon: <Compass className={iconClass} />,
      title: "Ancient Historical Heritage",
      description:
        "Explore rock-hewn churches, ancient obelisks, and medieval castles in one of the world's oldest Christian nations.",
      image: "/bg-48.jpg",
      color: "#ff5959",
    },
    {
      id: 3,
      icon: <Binoculars className={iconClass} />,
      title: "Unforgatable Adventures",
      description:
        "Embark on thrilling safaris, treks, and cultural experiences in the heart of Africa.",
      image: "/bg-50.jpg",
      color: "#ff4949",
    },
    {
      id: 4,
      icon: <Coffee className={iconClass} />,
      title: "Authentic Cultural Experiences",
      description:
        "Participate in traditional coffee ceremonies, colorful festivals, and connect with Ethiopia's diverse ethnic communities.",
      image: "/bg-71.jpg",
      color: "#00a8b5",
    },
    {
      id: 5,
      icon: <Utensils className={iconClass} />,
      title: "Culinary Adventures",
      description:
        "Savor Ethiopia's unique cuisine with its distinctive flavors, spices, and the famous injera bread.",
      image: "/bg-66.jpg",
    },
    {
      id: 6,
      icon: <Mountain className="h-6 w-6 text-white" />,
      title: "Stunning Natural Landscapes",
      description:
        "From the otherworldly Danakil Depression to the lush Simien Mountains, Ethiopia offers some of Africa's most dramatic scenery.",
      image: "/bg-72.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative h-64 sm:h-56 md:h-60 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="absolute inset-0">
            <img
              src={feature.image || "/placeholder.svg"}
              alt={feature.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Transparent overlay - more gradual to ensure text readability */}
          <div
            className={clsx(
              "absolute inset-0",
              feature.id === 2
                ? "bg-[#1089ff80]"
                : feature.id === 1
                ? "bg-[#ff595980]"
                : feature.id === 3
                ? "bg-[#ffffff20]"
                : "bg-[#00a8b580]"
            )}
          />

          {/* Content overlay with transparent primary color background */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <div className="bg-primary-600/30 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-primary-600/80 rounded-full border self-start">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-100 leading-relaxed line-clamp-2 mb-2">
                {feature.description}
              </p>
              <Link
                href="/ethiopia"
                className="text-white hover:text-primary-200 font-medium text-xs flex items-center">
                Learn more
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
