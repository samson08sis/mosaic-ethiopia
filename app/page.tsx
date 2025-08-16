import Hero from "@/components/home/Hero";
import HomeContent from "@/components/home/HomeContent.client";
import WelcomeSection from "@/components/home/WelcomeSection";

const getSlides = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/data/hero-images`, {
    next: { revalidate: 21600 },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch slides");
  const data = await res.json();
  return data.data;
};

export default async function Home() {
  const slides: any = await getSlides();

  return (
    <>
      <Hero slides={slides} /> {/* SSR */}
      <WelcomeSection /> {/* SSR */}
      <HomeContent /> {/* CSR */}
    </>
  );
}
