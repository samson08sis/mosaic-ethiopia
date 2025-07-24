import { TeamMember } from "@/types/team-members/type";

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  return [
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
}
