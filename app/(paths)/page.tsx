import Hero from "@/components/home/Hero";
import MainContent from "@/components/home/MainContent";
import WelcomeSection from "@/components/home/WelcomeSection";

const BACKEND_URL = process.env.BACKEND_URL;

const getSlides = async () => {
  const res = await fetch(`${BACKEND_URL}/api/data/hero-images`, {
    // next: { revalidate: 21600 },
    next: { tags: ["hero-section"] },
  });
  if (!res.ok) throw new Error("Failed to fetch slides");
  const data = await res.json();
  return data.data;
};

// const getPopularDestinations = async () => {
//   const res = await fetch(`${BACKEND_URL}/api/destinations/popular`, {
//     next: { revalidate: 21600 },
//     cache: "force-cache",
//   });
//   if (!res.ok) throw new Error("Failed to fetch destination");
//   const data = await res.json();
//   return data;
// };

// const getPopularPackages = async () => {
//   // const res = await fetch(`${BACKEND_URL}/api/packages/popular`, {
//   //   next: { revalidate: 21600 },
//   //   cache: "force-cache",
//   // });
//   // if (!res.ok) throw new Error("Failed to fetch packages");
//   // const data = await res.json();
//   const data = packages;
//   return data;
// };

export default async function Home() {
  const slides: any = await getSlides();

  return (
    <>
      <Hero slides={slides} /> {/* SSR */}
      <WelcomeSection /> {/* SSR */}
      <MainContent /> {/* SSR */}
    </>
  );
}
