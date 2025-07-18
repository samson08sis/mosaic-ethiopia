import Link from "next/link";
import ImageFeatures from "./ImageFeatures";
import WelcomeText from "./WelcomeText.client";

export default function WelcomeSection() {
  return (
    <div className="relative bg-theme">
      <div className="container mx-auto px-4 pt-16">
        <div className="py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12">
            {/* Welcome Text - Full width on mobile, half width on large screens */}
            <div className="mb-12 lg:mb-0 lg:w-5/12 text-center lg:text-left">
              <h2 className="font-arizonia text-4xl md:text-5xl text-primary mb-6">
                Welcome to Ethiopia
              </h2>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                It's Time to start your adventure
              </h2>
              <WelcomeText />
              <Link
                href="/about"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors">
                Learn More About Ethiopia
              </Link>
            </div>

            {/* Image Features - Full width on mobile, half width on large screens */}
            <div className="lg:w-7/12">
              <ImageFeatures />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
