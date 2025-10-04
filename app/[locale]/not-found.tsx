import LocalizedLink from "@/components/LocalizedLink";
import { Home, Map, Phone } from "lucide-react";
import AnimatedHeader from "@/components/pages/not-found/AnimatedHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-main">
      <div className="max-w-4xl w-full mx-auto text-center">
        <AnimatedHeader />

        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <LocalizedLink
            href="/"
            className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors">
            <Home className="h-5 w-5" />
            Return to Homepage
          </LocalizedLink>

          <LocalizedLink
            href="/destinations"
            className="flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 py-3 px-6 rounded-lg font-medium transition-colors">
            <Map className="h-5 w-5" />
            Explore Destinations
          </LocalizedLink>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedLink
                  href="/destinations/lalibela"
                  className="text-primary-500 hover:underline">
                  Lalibela
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink
                  href="/destinations/axum"
                  className="text-primary-500 hover:underline">
                  Axum
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink
                  href="/destinations/gondar"
                  className="text-primary-500 hover:underline">
                  Gondar
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Tour Packages</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedLink
                  href="/packages"
                  className="text-primary-500 hover:underline">
                  Historic Route
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink
                  href="/packages"
                  className="text-primary-500 hover:underline">
                  Omo Valley
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink
                  href="/packages"
                  className="text-primary-500 hover:underline">
                  Danakil Depression
                </LocalizedLink>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="mb-3 text-sm">Can't find what you're looking for?</p>
            <LocalizedLink
              href="/contact-us"
              className="inline-flex items-center gap-1 text-primary-500 hover:underline font-medium">
              <Phone className="h-4 w-4" />
              Contact Our Support Team
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
}
