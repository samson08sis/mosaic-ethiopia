import Link from "next/link";
import { Home, Map, Phone } from "lucide-react";
import AnimatedHeader from "./AnimatedHeader";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-main">
      <div className="max-w-4xl w-full mx-auto text-center">
        <AnimatedHeader />

        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors">
            <Home className="h-5 w-5" />
            Return to Homepage
          </Link>

          <Link
            href="/destinations"
            className="flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 py-3 px-6 rounded-lg font-medium transition-colors">
            <Map className="h-5 w-5" />
            Explore Destinations
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/destinations/lalibela"
                  className="text-primary-500 hover:underline">
                  Lalibela
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/axum"
                  className="text-primary-500 hover:underline">
                  Axum
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/gondar"
                  className="text-primary-500 hover:underline">
                  Gondar
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Tour Packages</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/packages"
                  className="text-primary-500 hover:underline">
                  Historic Route
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-primary-500 hover:underline">
                  Omo Valley
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-primary-500 hover:underline">
                  Danakil Depression
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="mb-3 text-sm">Can't find what you're looking for?</p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-1 text-primary-500 hover:underline font-medium">
              <Phone className="h-4 w-4" />
              Contact Our Support Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
