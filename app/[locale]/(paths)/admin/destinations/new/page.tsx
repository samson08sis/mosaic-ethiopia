"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Plus,
  X,
  Upload,
  MapPin,
  Star,
  Globe,
  Camera,
  Clipboard,
} from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";

interface DestinationFormData {
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  rating: number;
  reviews: number;
  city: string;
  region: string;
  mapEmbed: string;
  activities: string[];
  bestTimeToVisit: string;
  highlights: string[];
  thingsToDo: string[];
  culturalSignificance: string;
  historicalImportance: string;
  naturalFeatures: string;
}

const regions = [
  "Northern Ethiopia, Tigray Region",
  "Northern Ethiopia, Amhara Region",
  "Northeastern Ethiopia, Afar Region",
  "Western Ethiopia, Benishangul-Gumuz Region",
  "Southwestern Ethiopia, Gambela Region",
  "Eastern Ethiopia, Somali Region",
  "Central Ethiopia, Oromia Region",
  "Southern Ethiopia, Southern Nations, Nationalities, and Peoples' Region",
  "Southern Ethiopia, Sidama Region",
  "Southwestern Ethiopia, South West Ethiopia Peoples' Region",
  "Eastern Ethiopia, Harari Region",
  "Central Ethiopia, Addis Ababa City",
  "Eastern Ethiopia, Dire Dawa City",
];

// const continents = [
//   "Africa",
//   "Asia",
//   "Europe",
//   "North America",
//   "South America",
//   "Australia",
//   "Antarctica",
// ];

const activityOptions = [
  "Cultural",
  "Historical",
  "Religious",
  "Trekking",
  "Wildlife",
  "Nature",
  "Adventure",
  "Geological",
  "Photography",
  "Archaeological",
  "Tribal",
  "Urban",
  "Culinary",
  "Architecture",
];

export default function NewDestinationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedGalleryImage, setSelectedGalleryImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const [formData, setFormData] = useState<DestinationFormData>({
    name: "",
    slug: "",
    image: "",
    gallery: [],
    description: "",
    rating: 4.5,
    reviews: 0,
    city: "",
    region: "",
    mapEmbed: "",
    activities: [],
    bestTimeToVisit: "",
    highlights: [""],
    thingsToDo: [""],
    culturalSignificance: "",
    historicalImportance: "",
    naturalFeatures: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Destination name is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    // if (!formData.continent) newErrors.continent = "Continent is required";
    if (!formData.region.trim()) newErrors.region = "Region is required";
    if (!formData.bestTimeToVisit.trim())
      newErrors.bestTimeToVisit = "Best time to visit is required";
    if (formData.activities.length === 0)
      newErrors.activities = "At least one activity is required";
    if (formData.highlights.filter((h) => h.trim()).length === 0)
      newErrors.highlights = "At least one highlight is required";
    if (formData.thingsToDo.filter((t) => t.trim()).length === 0)
      newErrors.thingsToDo = "At least one thing to do is required";
    if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = "Rating must be between 1 and 5";
    if (formData.reviews < 0) newErrors.reviews = "Reviews cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddImage = () => {
    if (!selectedGalleryImage || !selectedGalleryImage.startsWith("http")) {
      setErrors({ gallery: "Please enter a valid image URL." });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, selectedGalleryImage],
    }));

    setSelectedGalleryImage("");
    setErrors({});
  };

  const handleImageUpload = () => {
    if (!formData.image || !formData.image.startsWith("http")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please enter a valid image URL.",
      }));
      return;
    }
    // Optional: preview or upload logic here
    console.log("Uploading image:", formData.image);
  };

  const handleSelectImage = (index: number) => {
    setSelectedGalleryImage(formData.gallery[index]);
    setSelectedImageIndex(index);
  };

  const handleSaveImage = () => {
    if (!selectedGalleryImage || !selectedGalleryImage.startsWith("http")) {
      setErrors({ gallery: "Please enter a valid image URL." });
      return;
    }

    const updatedImages = [...formData.gallery];
    updatedImages[selectedImageIndex!] = selectedGalleryImage;

    setFormData((prev) => ({ ...prev, gallery: updatedImages }));
    setSelectedGalleryImage("");
    setSelectedImageIndex(null);
    setErrors({});
  };

  const handleDeleteGalleryImage = (index: number) => {
    const updatedImages = formData.gallery.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, gallery: updatedImages }));

    // Reset selection if deleted image was selected
    if (selectedImageIndex === index) {
      setSelectedGalleryImage("");
      setSelectedImageIndex(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Generate ID from name
      const id = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const destinationData = {
        ...formData,
        id,
        highlights: formData.highlights.filter((h) => h.trim()),
        thingsToDo: formData.thingsToDo.filter((t) => t.trim()),
      };

      // Here you would typically send to your API
      console.log("Creating destination:", destinationData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/admin/destinations");
    } catch (error) {
      console.error("Error creating destination:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addArrayItem = (field: "highlights" | "thingsToDo") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "highlights" | "thingsToDo",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (
    field: "highlights" | "thingsToDo",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const toggleActivity = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <LocalizedLink
            href="/admin/destinations"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Destinations
          </LocalizedLink>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create New Destination
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Add a new destination to your travel catalog
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Destination Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Simien Mountains"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Unique Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., simien-mountains"
                />
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                )}
              </div>
              {/* Nearest City */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nearest City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Gondar"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Region *
                </label>

                <input
                  list="region-options"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      region: e.target.value,
                    }))
                  }
                  placeholder="Select or type a region"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <datalist id="region-options">
                  {regions.map((region) => (
                    <option key={region} value={region} />
                  ))}
                </datalist>

                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">{errors.region}</p>
                )}
              </div>
              {/* Map URL */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Google Maps Embed Code *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder='e.g. <iframe src="..."></iframe> • Paste the embed code here'
                    value={formData.mapEmbed}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        mapEmbed: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {/* Paste Icon Button */}
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        setFormData((prev) => ({
                          ...prev,
                          mapEmbed: text,
                        }));
                      } catch (err) {
                        console.error("Failed to read clipboard: ", err);
                      }
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-blue-600"
                    title="Paste from clipboard">
                    <Clipboard className="h-5 w-5" />
                  </button>
                </div>
                {errors.mapEmbed && (
                  <p className="text-red-500 text-sm mt-1">{errors.mapEmbed}</p>
                )}
              </div>

              {/* Continent */}
              {/* <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Continent *
                </label>
                <select
                  value={formData.continent}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      continent: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select Continent</option>
                  {continents.map((continent) => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
                {errors.continent && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.continent}
                  </p>
                )}
              </div> */}

              {/* Best Time to Visit */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Best Time to Visit *
                </label>
                <input
                  type="text"
                  value={formData.bestTimeToVisit}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bestTimeToVisit: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., October to March"
                />
                {errors.bestTimeToVisit && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bestTimeToVisit}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Rating *
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rating: Number.parseFloat(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                )}
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reviews: Number.parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.reviews && (
                  <p className="text-red-500 text-sm mt-1">{errors.reviews}</p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div className="mt-6">
              <label
                htmlFor="image-url"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Image URL *
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="image-url"
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                  required
                />

                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}

              {formData.image && formData.image.startsWith("http") && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-w-xs max-h-40 object-contain rounded-lg border border-slate-300 dark:border-slate-600"
                  />
                </div>
              )}
            </div>

            {/* Image Gallery */}
            <div className="mt-6">
              <label
                htmlFor="image-url"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Image Gallery *
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="image-url"
                  type="url"
                  value={selectedGalleryImage}
                  onChange={(e) => setSelectedGalleryImage(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                />

                {selectedImageIndex === null ? (
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2">
                    + Add Image
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveImage}
                    className="w-full sm:w-auto px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2">
                    💾 Save Image
                  </button>
                )}
              </div>

              {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
              )}

              {/* Gallery Preview */}
              {formData.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="relative group">
                      <button
                        type="button"
                        onClick={() => handleSelectImage(index)}
                        className="focus:outline-none w-full">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className={`w-full h-32 object-contain rounded-lg border ${
                            selectedImageIndex === index
                              ? "border-blue-500 ring-2 ring-blue-300"
                              : "border-slate-300 dark:border-slate-600"
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100 transition"
                        title="Delete image">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Describe the destination..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </Card>

          {/* Activities */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Activities *
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {activityOptions.map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => toggleActivity(activity)}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${
                    formData.activities.includes(activity)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-blue-300"
                  }`}>
                  {activity}
                </button>
              ))}
            </div>
            {errors.activities && (
              <p className="text-red-500 text-sm mt-3">{errors.activities}</p>
            )}
          </Card>

          {/* Highlights */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Highlights *
              </h2>
            </div>

            <div className="space-y-3">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) =>
                      updateArrayItem("highlights", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter a highlight..."
                  />
                  {formData.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("highlights", index)}
                      className="px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("highlights")}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                Add Highlight
              </button>
            </div>
            {errors.highlights && (
              <p className="text-red-500 text-sm mt-3">{errors.highlights}</p>
            )}
          </Card>

          {/* Things to Do */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Things to Do *
              </h2>
            </div>

            <div className="space-y-3">
              {formData.thingsToDo.map((thing, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={thing}
                    onChange={(e) =>
                      updateArrayItem("thingsToDo", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter something to do..."
                  />
                  {formData.thingsToDo.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("thingsToDo", index)}
                      className="px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("thingsToDo")}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                Add Activity
              </button>
            </div>
            {errors.thingsToDo && (
              <p className="text-red-500 text-sm mt-3">{errors.thingsToDo}</p>
            )}
          </Card>

          {/* Additional Information */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Additional Information
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Cultural Significance
                </label>
                <textarea
                  value={formData.culturalSignificance}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      culturalSignificance: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Describe the cultural importance..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Historical Importance
                </label>
                <textarea
                  value={formData.historicalImportance}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      historicalImportance: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Describe the historical significance..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Natural Features
                </label>
                <textarea
                  value={formData.naturalFeatures}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      naturalFeatures: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Describe the natural features..."
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <LocalizedLink
              href="/admin/destinations"
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Cancel
            </LocalizedLink>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Destination
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
