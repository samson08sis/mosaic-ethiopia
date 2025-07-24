"use client";

import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CTAButtons from "@/components/pages/about/CTAButtons";
import clsx from "clsx";
import { TeamMember } from "@/types/team-members/type";
import TeamCarousel from "./TeamCarousel";

export default function AboutPageContent({
  teamMembers,
}: {
  teamMembers: TeamMember[];
}) {
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
              priority
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
      <TeamCarousel teamMembers={teamMembers} />

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
          <CTAButtons />
        </div>
      </div>
    </div>
  );
}
