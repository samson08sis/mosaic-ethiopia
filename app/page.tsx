import Hero from "@/components/home/Hero";
import HomeContent from "@/components/home/Homecontent.client";
import WelcomeSection from "@/components/home/WelcomeSection";

export default function Home() {
  return (
    <>
      {/* Hero - SSR*/}
      <Hero />
      {/* Welcome section - SSR */}
      <WelcomeSection />
      <HomeContent /> {/* CSR */}
    </>
  );
}
