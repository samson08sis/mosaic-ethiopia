"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-arizonia text-3xl text-primary dark:text-primary-400 mb-4">
              MosaicEthiopia
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover the world with us. We provide unforgettable travel
              experiences with customized itineraries and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="facebook.com"
                target="_blank"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Book a Trip
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Popular Destinations
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Bali, Indonesia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Santorini, Greece
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Kyoto, Japan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Machu Picchu, Peru
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  Paris, France
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  New York, USA
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Travel Street, Adventure City, AC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary dark:text-primary-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary dark:text-primary-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  info@MosaicEthiopia.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MosaicEthiopia. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
