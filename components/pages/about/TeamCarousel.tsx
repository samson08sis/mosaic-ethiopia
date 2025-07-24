"use client";

import Image from "next/image";
import Carousel from "@/components/ui/carousel";
import SocialLinks from "@/components/pages/about/SocialLinks";
import { TeamMember } from "@/types/team-members/type";

export default function TeamCarousel({
  teamMembers,
}: {
  teamMembers: TeamMember[];
}) {
  return (
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

              <SocialLinks social={member.social} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
