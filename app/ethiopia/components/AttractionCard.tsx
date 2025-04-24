import { MapPin } from "lucide-react";
import Image from "next/image";

type AttractionProps = {
  item:
    | {
        id: number;
        name: string;
        description: string;
        image: string;
        location: string;
        tags: string[];
        wikiUrl: string;
      }
    | {
        id: number;
        name: string;
        description: string;
        image: string;
        ingredients: string[];
        significance: string;
      };
};

export default function AttractionCard({ item }: AttractionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {item.name}
          </h3>
        </div>

        {"location" in item && (
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{item.location}</span>
          </div>
        )}

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1">
          {item.description}
        </p>

        {"wikiUrl" in item && (
          <a
            href={item.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline mb-4 inline-flex items-center">
            Read more &gt;&gt;
          </a>
        )}

        {"tags" in item && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {"ingredients" in item && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Ingredients:
            </h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
              {item.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              {item.significance}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
