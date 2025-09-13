import Testimonials from "./Testimonials";

async function getTestimonials() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/data/reviews/top`, {
      next: { revalidate: 3600, tags: ["reviews", "testimonials"] }, // 1 hr
    });

    if (!res.ok) {
      console.error("Failed to fetch testimonials:", res.statusText);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export default async function TestimonialWrapper() {
  const testimonials = await getTestimonials();
  return <Testimonials testimonials={testimonials} />;
}
