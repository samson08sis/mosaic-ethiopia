import Image from "next/image";
import { Compass, Shield, Clock, Binoculars, Coffee } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function ImageFeatures() {
  const features = [
    {
      id: 1,
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Travel With Confidence",
      description:
        "Enjoy peace of mind with our comprehensive support, insurance, and safety measures throughout your journey.",
      image: "/bg-49.jpg",
      color: "#1089ff",
    },
    {
      id: 2,
      icon: <Compass className="h-8 w-8 text-white" />,
      title: "Ancient Historical Heritage",
      description:
        "Explore rock-hewn churches, ancient obelisks, and medieval castles in one of the world's oldest Christian nations.",
      image: "/bg-48.jpg",
      color: "#ff5959",
    },
    {
      id: 3,
      icon: <Binoculars className="h-8 w-8 text-white" />,
      title: "Unforgatable Adventures",
      description:
        "Embark on thrilling safaris, treks, and cultural experiences in the heart of Africa.",
      image: "/bg-50.jpg",
      color: "#ff4949",
    },
    {
      id: 4,
      icon: <Coffee className="h-8 w-8 text-white" />,
      title: "Authentic Cultural Experiences",
      description:
        "Participate in traditional coffee ceremonies, colorful festivals, and connect with Ethiopia's diverse ethnic communities.",
      image: "/bg-51.jpg",
      color: "#00a8b5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 h-full">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative h-80 md:h-96 rounded-xl overflow-hidden group shadow-lg">
          <Image
            src={feature.image || "/placeholder.svg"}
            alt={"Feature " + feature.id}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay - more gradual to ensure text readability */}
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
            )}></div>

          {/* Content overlay with transparent primary color background */}
          <div className="absolute inset-x-0 bottom-0 text-white h-full">
            <div className="bg-primary-600/30 p-4 rounded-lg h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-600/80 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-base text-gray-100 leading-relaxed">
                {feature.description}
              </p>
              <Link
                href="/ethiopia"
                className="mt-4 text-white hover:text-primary-200 font-medium text-sm flex items-center">
                Learn more
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
