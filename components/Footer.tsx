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

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Tour Packages", href: "/packages" },
    { name: "Book a Trip", href: "/book" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  destinations: [
    { name: "Lalibela, Ethiopia", href: "/destinations/lalibela" },
    { name: "Gondar, Ethiopia", href: "/destinations/gondar" },
    {
      name: "Simien Mountains, Ethiopia",
      href: "/destinations/simien-mountains",
    },
    {
      name: "Danakil Depression, Ethiopia",
      href: "/destinations/danakil",
    },
    {
      name: "Omo Valley, Ethiopia",
      href: "/destinations/omo-valley",
    },
  ],
  contactInfo: [
    {
      icon: (
        <MapPin className="h-5 w-5 text-primary dark:text-primary-400 mr-2" />
      ),
      text: "123 Ghana Avenue, Addis Ababa, AC 12345",
    },
    {
      icon: (
        <Phone className="h-5 w-5 text-primary dark:text-primary-400 mr-2" />
      ),
      text: "+251 (911) 234-5678",
    },
    {
      icon: (
        <Mail className="h-5 w-5 text-primary dark:text-primary-400 mr-2" />
      ),
      text: "info@mosaicethiopia.com",
    },
  ],
  socialMedia: [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://www.facebook.com",
    },
    { icon: <Twitter className="h-5 w-5" />, href: "https://www.twitter.com" },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com",
    },
    { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com" },
  ],
};

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
              {footerLinks.socialMedia.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Popular Destinations
            </h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((destination) => (
                <li>
                  <a
                    href={destination.href}
                    className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-400">
                    {destination.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact Information
            </h3>
            <ul className="space-y-4">
              {footerLinks.contactInfo.map((info) => (
                <li className="flex items-center">
                  {info.icon}
                  <span className="text-gray-600 dark:text-gray-400">
                    {info.text}
                  </span>
                </li>
              ))}
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
