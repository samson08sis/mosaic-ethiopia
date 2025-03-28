import Image from "next/image";
import { Compass, Shield, Clock } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function ImageFeatures() {
  const features = [
    {
      id: 1,
      icon: <Compass className="h-8 w-8 text-white" />,
      title: "Discover Amazing Places",
      description:
        "Explore breathtaking destinations handpicked by our travel experts for unforgettable experiences.",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "#1089ff",
    },
    {
      id: 2,
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Travel With Confidence",
      description:
        "Enjoy peace of mind with our comprehensive support, insurance, and safety measures throughout your journey.",
      image:
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "#ff5959",
    },
    {
      id: 3,
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Personalized Experiences",
      description:
        "Every trip is tailored to your preferences, ensuring a unique and memorable adventure just for you.",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
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
            alt={feature.title}
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
