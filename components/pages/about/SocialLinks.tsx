"use client";

import { TeamMember } from "@/types/team-members/type";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Link as LucideLink,
} from "lucide-react";

const socialLinks = [
  { key: "email", hrefPrefix: "mailto:", icon: Mail, label: "Email" },
  { key: "github", hrefPrefix: "", icon: Github, label: "GitHub" },
  { key: "linkedin", hrefPrefix: "", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", hrefPrefix: "", icon: Twitter, label: "Twitter" },
  { key: "web", hrefPrefix: "", icon: LucideLink, label: "Website" },
] as const;

export default function SocialLinks({
  social,
}: {
  social: TeamMember["social"];
}) {
  return (
    <div className="flex space-x-3 mt-auto">
      {socialLinks.map(
        ({ key, hrefPrefix, icon: Icon, label }) =>
          social[key] && (
            <a
              key={key}
              href={`${hrefPrefix}${social[key]}`}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noopener noreferrer"}
              className="text-gray-500 hover:text-primary-600 transition-colors"
              aria-label={`${label}`}>
              <Icon size={18} />
            </a>
          )
      )}
    </div>
  );
}
