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
import { Item } from "@radix-ui/react-accordion";

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
      icon: MapPin,
      text: "123 Ghana Avenue, Addis Ababa, AC 12345",
    },
    {
      icon: Phone,
      text: "+251 (911) 234-5678",
    },
    {
      icon: Mail,
      text: "info@mosaicethiopia.com",
    },
  ],
  socialMedia: [
    {
      icon: Facebook,
      href: "https://www.facebook.com",
    },
    { icon: Twitter, href: "https://www.twitter.com" },
    {
      icon: Instagram,
      href: "https://www.instagram.com",
    },
    { icon: Youtube, href: "https://www.youtube.com" },
  ],
  bottomSection: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-6 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/footer-bg.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/70" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-arizonia text-3xl text-primary mb-4">
              Mosaic Ethiopia
            </h3>
            <p className="text-gray-300 mb-4">
              Discover the world with us. We provide unforgettable travel
              experiences with customized itineraries and exceptional service.
            </p>
            <div className="flex space-x-4">
              {footerLinks.socialMedia.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  className="text-gray-300 hover:text-primary transition-colors duration-300"
                  rel="noreferrer">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Popular Destinations
            </h3>
            <ul className="space-y-2">
              {footerLinks.destinations.map((destination) => (
                <li key={destination.href}>
                  <Link
                    href={destination.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300">
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Information
            </h3>
            <ul className="space-y-4">
              {footerLinks.contactInfo.map((info) => (
                <li>
                  <info.icon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TravelExplorer. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            {footerLinks.bottomSection.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-300 hover:text-primary transition-colors duration-300">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
