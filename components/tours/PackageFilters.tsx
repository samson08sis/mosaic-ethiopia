const filterList = {
  price: [
    { val: "all", label: "All Prices" },
    { val: "under1500", label: "Under $1,500" },
    { val: "1500to2500", label: "$1,500 - $2,500" },
    { val: "over2500", label: "Over $2,500" },
  ],
  duration: [
    {
      val: "all",
      label: "All Durations",
    },
    {
      val: "short",
      label: "Short (1-7 days)",
    },
    {
      val: "medium",
      label: "Medium (8-14 days)",
    },
    {
      val: "long",
      label: "Long (15+ days)",
    },
  ],
};

type PackageFilterProps = {
  price: string;
  duration: string;
  onPriceToggled: (val: string) => void;
  onDurationToggled: (val: string) => void;
};

export default function PackageFilters({
  price,
  duration,
  onPriceToggled,
  onDurationToggled,
}: PackageFilterProps) {
  return (
    <div className="bg-muted py-6 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Price Range
            </h3>
            <div className="space-y-2">
              {filterList.price.map((item) => (
                <label key={item.val} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value={item.val}
                    checked={price === item.val}
                    onChange={() => onPriceToggled(item.val)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Duration
            </h3>
            <div className="space-y-2">
              {filterList.duration.map((item) => (
                <label key={item.val} className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    value={item.val}
                    checked={duration === item.val}
                    onChange={() => onDurationToggled(item.val)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
