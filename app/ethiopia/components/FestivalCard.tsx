import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type FestivalProps = {
  festival: {
    id: number;
    name: string;
    description: string;
    image: string;
    date: string;
    location: string;
    tags: string[];
    wikiUrl: string;
  };
};

export default function FestivalCard({ festival }: FestivalProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-2/5 relative h-48 md:h-auto">
          <Image
            src={festival.image || "/placeholder.svg"}
            alt={festival.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="md:w-3/5 p-6 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {festival.name}
          </h3>

          <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm mb-2">
            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{festival.date}</span>
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{festival.location}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1">
            {festival.description}
          </p>

          <a
            href={festival.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline mb-4 inline-flex items-center">
            Read more &gt;&gt;
          </a>

          <div className="flex flex-wrap gap-2 mt-auto">
            {festival.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
