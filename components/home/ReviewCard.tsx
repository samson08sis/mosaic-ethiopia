import { Testimonial } from "@/types/types";
import StarIcon from "../ui/svgs/StarSVG";
import Image from "next/image";

export default function ReviewCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const isAnonymous = testimonial.anonymous;

  const avatarSrc = isAnonymous
    ? null
    : testimonial.user && typeof testimonial.user === "object"
    ? testimonial.user.avatar || "/placeholder.jpg"
    : "/placeholder.jpg";

  const displayName = isAnonymous
    ? "Anonymous"
    : typeof testimonial.user === "object"
    ? testimonial.user.name
    : "Unnamed";

  const location =
    !isAnonymous && typeof testimonial.user === "object"
      ? testimonial.user.location
      : null;

  return (
    <div
      key={testimonial._id}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 mr-4 bg-primary-50 rounded-full">
          {avatarSrc && (
            <Image
              src={avatarSrc}
              alt={`${displayName}'s Profile`}
              className="rounded-full object-cover"
              fill
              sizes="48px"
            />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {displayName}
          </h3>
          {location && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {location}
            </p>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            type={testimonial.rating - i >= 1 ? "full" : "empty"}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="line-clamp-6 text-gray-700 dark:text-gray-300 italic font-sans">
        "{testimonial.quote}"
      </p>

      {/* Helpful Votes */}
      {typeof testimonial.votes === "number" && testimonial.votes > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {testimonial.votes} people found this helpful
        </p>
      )}
    </div>
  );
}
