"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Package } from "lucide-react";
import packages from "@/data/packages";
import destinations from "@/data/destinations";

type SelectorItem = {
  id: string;
  name: string;
  image: string;
  type: "destination" | "package";
};

interface DestinationSelectorProps {
  value: string;
  onChange: (value: string, type: "destination" | "package") => void;
}

export default function DestinationSelector({
  value,
  onChange,
}: DestinationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<SelectorItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine packages and destinations
  const items: SelectorItem[] = [
    ...packages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      image: pkg.image,
      type: "package" as const,
    })),
    ...destinations.map((dest) => ({
      id: dest.id,
      name: dest.name,
      image: dest.image,
      type: "destination" as const,
    })),
  ];

  // Filter items based on search term
  const filteredItems =
    searchTerm.trim() === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Set selected item when value changes
  useEffect(() => {
    if (value) {
      const found = items.find((item) => item.id === value);
      if (found) {
        setSelectedItem(found);
      }
    } else {
      setSelectedItem(null);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle item selection
  const handleSelect = (item: SelectorItem) => {
    setSelectedItem(item);
    onChange(item.id, item.type);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex items-center justify-between w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        {selectedItem ? (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded overflow-hidden mr-3">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{selectedItem.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {selectedItem.type}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Select destination or package
          </span>
        )}
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              <div className="p-2 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-500 dark:text-gray-400">
                Destinations
              </div>
              {filteredItems
                .filter((item) => item.type === "destination")
                .map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelect(item)}>
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                    </div>
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                ))}

              <div className="p-2 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-500 dark:text-gray-400">
                Packages
              </div>
              {filteredItems
                .filter((item) => item.type === "package")
                .map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleSelect(item)}>
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                    </div>
                    <Package className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
