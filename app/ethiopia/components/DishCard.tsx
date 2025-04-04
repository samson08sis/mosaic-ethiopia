import Image from "next/image";

type DishProps = {
  dish: {
    id: number;
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    significance?: string;
  };
};

export default function DishCard({ dish }: DishProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={dish.image || "/placeholder.svg"}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {dish.name}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1">
          {dish.description}
        </p>

        {dish.significance && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">
              Cultural Significance
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {dish.significance}
            </p>
          </div>
        )}

        <div className="mt-auto">
          <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">
            Key Ingredients
          </h4>
          <div className="flex flex-wrap gap-2">
            {dish.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
