import AboutPageContent from "@/components/pages/about/AboutPageContent.client";
import { fetchTeamMembers } from "@/lib/api/about/team";

export default async function AboutPage() {
  const teamMembers = await fetchTeamMembers();

  return <AboutPageContent teamMembers={teamMembers} />;
}
