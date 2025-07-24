"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Carousel from "@/components/ui/carousel";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Link as LucideLink,
} from "lucide-react";
import clsx from "clsx";
import { bg } from "date-fns/locale";

export default function AboutPage() {
  const header = {
    title: "About Us",
    subtitle:
      "Discover the story behind Travel Explorer and our passion for creating unforgettable journeys.",
    bgImage:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  };

  const story = {
    title: "Our Story",
    paragraphs: [
      "Travel Explorer was founded in 2010 by a group of passionate travelers who believed that exploring the world should be accessible to everyone. What started as a small blog sharing travel tips and hidden gems has grown into a full-service travel platform helping thousands of adventurers discover new destinations every year.",
      "Our mission is simple: to inspire and enable people to explore the world, experience different cultures, and create memories that last a lifetime. We believe that travel has the power to transform lives, broaden perspectives, and foster understanding between people from all walks of life.",
      "Today, our team of experienced travel experts works tirelessly to curate exceptional travel experiences tailored to your preferences and interests. Whether you're seeking adventure, relaxation, cultural immersion, or a bit of everything, we're here to make your travel dreams a reality.",
    ],
  };

  const teamMembers = [
    {
      id: 1,
      name: "Abebe Bekele",
      role: "Founder & CEO",
      bio: "15+ years in travel, passionate about sharing Ethiopian culture with the world.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        email: "abebe@example.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 2,
      name: "Tigist Haile",
      role: "Head of Operations",
      bio: "Logistics expert ensuring seamless travel experiences from start to finish.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        email: "tigist@example.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: 3,
      name: "Dawit Tadesse",
      role: "Senior Tour Guide",
      bio: "Expert in Ethiopian history, bringing destinations to life with storytelling.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      social: {
        email: "dawit@example.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 4,
      name: "Hiwot Mengistu",
      role: "Customer Relations",
      bio: "Dedicated to exceptional customer experiences before, during, and after travel.",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      social: {
        email: "hiwot@example.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 5,
      name: "Solomon Girma",
      role: "Marketing Director",
      bio: "Creative visionary showcasing Ethiopia's beauty through compelling campaigns.",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      social: {
        email: "solomon@example.com",
        twitter: "https://twitter.com",
        github: "https://github.com",
      },
    },
    {
      id: 6,
      name: "Bethlehem Alemu",
      role: "Sustainability Officer",
      bio: "Developing initiatives to protect natural resources and support local communities.",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      social: {
        email: "bethlehem@example.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      id: 7,
      name: "Yonas Tesfaye",
      role: "Lead Developer",
      bio: "Full-stack developer building our core booking platform and payment systems.",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      social: {
        email: "yonas@example.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        web: "yonasTes.io",
      },
    },
    {
      id: 8,
      name: "Meron Hailu",
      role: "Frontend Developer",
      bio: "UI/UX specialist creating our intuitive and beautiful responsive design.",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      social: {
        email: "meron@example.com",
        github: "https://github.com",
        twitter: "https://twitter.com",
        web: "merryHailu.io",
      },
    },
    {
      id: 9,
      name: "Eyob Mekonnen",
      role: "Backend Developer",
      bio: "Database expert designing our secure booking and availability tracking systems.",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
      social: {
        email: "eyob@example.com",
        github: "https://github.com",
      },
    },
  ];

  const socialLinks = [
    { key: "email", hrefPrefix: "mailto:", icon: Mail, label: "Email" },
    { key: "github", hrefPrefix: "", icon: Github, label: "GitHub" },
    { key: "linkedin", hrefPrefix: "", icon: Linkedin, label: "LinkedIn" },
    { key: "twitter", hrefPrefix: "", icon: Twitter, label: "Twitter" },
    { key: "web", hrefPrefix: "", icon: LucideLink, label: "Website" },
  ];

  const ourValues = [
    {
      title: "Authenticity",
      description:
        "We believe in authentic travel experiences that connect you with local cultures, traditions, and people. Our packages are designed to go beyond tourist attractions and provide genuine insights into each destination.",
    },
    {
      title: "Sustainability",
      description:
        "We are committed to responsible tourism that respects and preserves the environment, wildlife, and local communities. We partner with eco-friendly accommodations and support conservation initiatives worldwide.",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of your journey. From meticulous planning to 24/7 support during your travels, our team is dedicated to ensuring your experience exceeds expectations at every turn.",
    },
  ];

  return (
    <div className="pt-20 pb-16 bg-theme">
      <PageHeader
        title={header.title}
        subtitle={header.subtitle}
        backgroundImage={header.bgImage}
        overlayColor="primary"
        overlayOpacity={0.7}
      />

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-arizonia text-4xl text-primary mb-6">
              {story.title}
            </h2>
            {story.paragraphs.map((p, i) => (
              <p
                key={i}
                className={clsx("mb-4", i !== story.paragraphs.length - 1)}>
                {p}
              </p>
            ))}
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Travel Explorer Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-arizonia text-4xl text-primary text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ourValues.map((value) => (
              <div
                key={value.title}
                className="bg-card p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {value.title}
                </h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-arizonia text-4xl text-primary text-center mb-12">
          Meet Our Team
        </h2>

        <Carousel itemsPerView={4} gap={24} className="px-4 sm:px-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full">
              <div className="p-6 flex flex-col items-center">
                {/* Smaller round profile image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2 text-center">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                  {member.bio}
                </p>

                <div className="flex space-x-3 mt-auto">
                  {socialLinks.map(
                    ({ key, hrefPrefix, icon: Icon, label }) =>
                      member.social[key as keyof typeof member.social] && (
                        <a
                          key={key}
                          href={`${hrefPrefix}${
                            member.social[key as keyof typeof member.social]
                          }`}
                          target={key === "email" ? undefined : "_blank"}
                          rel={
                            key === "email" ? undefined : "noopener noreferrer"
                          }
                          className="text-gray-500 hover:text-primary-600 transition-colors">
                          <Icon size={18} />
                          <span className="sr-only">{`${label} ${member.name}`}</span>
                        </a>
                      )
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-arizonia text-4xl mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of satisfied travelers who have experienced the world
            with Travel Explorer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Book Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
