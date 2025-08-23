import Testimonials from "./Testimonials";

async function getTestimonials() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/data/reviews/recent`,
    {
      next: { revalidate: 12000 }, // 20 mins
    }
  );
  if (!res.ok) return []; // fallback
  return res.json();
}

export default async function TestimonialWrapper() {
  const testimonials = await getTestimonials();
  return <Testimonials initialData={testimonials} />;
}
