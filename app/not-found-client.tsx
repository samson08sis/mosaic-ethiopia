"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Map, Home, Phone } from "lucide-react";

export default function NotFoundClient() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background-main">
      <div className="max-w-4xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8">
          <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
          <div className="relative h-64 md:h-80 mb-8 mx-auto max-w-lg">
            <Image
              src="/images/404-cover.png"
              alt="Lost traveler"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! You seem to be lost
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            The page you're looking for has wandered off the map. It might have
            been moved, deleted, or perhaps never existed in the first place -
            much like those hidden gems waiting to be discovered on your next
            adventure.
          </p>
        </motion.div>

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
              href="/contact"
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
