import { Testimonial } from "@/types/types";
import StarIcon from "../ui/svgs/StarSVG";

export default function ReviewCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      key={testimonial._id}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={
            typeof testimonial.user === "object"
              ? testimonial.user.avatar || "placeholder.jpg"
              : "anonymous.jpg"
          }
          alt=""
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {typeof testimonial.user === "object"
              ? testimonial.user.name
              : "Anonymous"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {typeof testimonial.user === "object" && testimonial.user?.location}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            type={
              testimonial.rating - i >= 1
                ? "full"
                : // : testimonial.rating >= 0.5
                  // ? "half"
                  "empty"
            }
          />
        ))}
      </div>

      {/* Quote */}
      <p className="line-clamp-6 text-gray-700 dark:text-gray-300 italic font-sans">
        "{testimonial.quote}"
      </p>

      {/* Helpful Votes */}
      {testimonial.votes && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {testimonial.votes} people found this helpful
        </p>
      )}
    </div>
  );
}
