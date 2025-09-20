"use client";

import type React from "react";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  Upload,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Import destinations data
import destinations from "@/data/destinations";

export default function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const isNewDestination = id === "new";

  // Find the destination if editing an existing one
  const existingDestination = !isNewDestination
    ? destinations.find((d) => d.id === id)
    : null;

  // Initialize form state
  const [formData, setFormData] = useState({
    id: existingDestination?.id || "",
    name: existingDestination?.name || "",
    image: existingDestination?.image || "",
    description: existingDestination?.description || "",
    rating: existingDestination?.rating || 0,
    reviews: existingDestination?.reviews || 0,
    continent: existingDestination?.continent || "Africa",
    activities: existingDestination?.activities || [],
    location: existingDestination?.location || "",
    bestTimeToVisit: existingDestination?.bestTimeToVisit || "",
    highlights: existingDestination?.highlights || [],
    thingsToDo: existingDestination?.thingsToDo || [],
    culturalSignificance: existingDestination?.culturalSignificance || "",
    historicalImportance: existingDestination?.historicalImportance || "",
    naturalFeatures: existingDestination?.naturalFeatures || "",
  });

  // State for new activity/highlight/thing to do
  const [newActivity, setNewActivity] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [newThingToDo, setNewThingToDo] = useState("");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new activity
  const addActivity = () => {
    if (newActivity.trim()) {
      setFormData((prev) => ({
        ...prev,
        activities: [...prev.activities, newActivity.trim()],
      }));
      setNewActivity("");
    }
  };

  // Remove activity
  const removeActivity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  // Add new highlight
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()],
      }));
      setNewHighlight("");
    }
  };

  // Remove highlight
  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  // Add new thing to do
  const addThingToDo = () => {
    if (newThingToDo.trim()) {
      setFormData((prev) => ({
        ...prev,
        thingsToDo: [...prev.thingsToDo, newThingToDo.trim()],
      }));
      setNewThingToDo("");
    }
  };

  // Remove thing to do
  const removeThingToDo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      thingsToDo: prev.thingsToDo.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the data to your backend here
    console.log("Saving destination:", formData);

    // Navigate back to destinations list
    router.push("/admin/destinations");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNewDestination ? "Add Destination" : "Edit Destination"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNewDestination && (
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details about the destination.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Destination Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Lalibela, Ethiopia"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="continent">Continent</Label>
                  <Select
                    value={formData.continent}
                    onValueChange={(value) =>
                      handleSelectChange("continent", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select continent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa">Africa</SelectItem>
                      <SelectItem value="Asia">Asia</SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="North America">
                        North America
                      </SelectItem>
                      <SelectItem value="South America">
                        South America
                      </SelectItem>
                      <SelectItem value="Oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Northern Ethiopia, Amhara Region"
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the destination"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bestTimeToVisit"
                      name="bestTimeToVisit"
                      value={formData.bestTimeToVisit}
                      onChange={handleChange}
                      placeholder="e.g., October to March"
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rating & Reviews</Label>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Star className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="rating"
                        name="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating (0-5)"
                        className="pl-8"
                      />
                    </div>
                    <Input
                      id="reviews"
                      name="reviews"
                      type="number"
                      min="0"
                      value={formData.reviews}
                      onChange={handleChange}
                      placeholder="Number of reviews"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Activities</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.activities.map((activity, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {activity}
                      <button
                        type="button"
                        onClick={() => removeActivity(index)}
                        className="ml-1 rounded-full hover:bg-muted">
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {activity}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Add an activity"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addActivity())
                    }
                  />
                  <Button type="button" onClick={addActivity} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Destination Details</CardTitle>
              <CardDescription>
                Add highlights and things to do at this destination.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Highlights</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {highlight}
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="ml-1 rounded-full hover:bg-muted">
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {highlight}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a highlight"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addHighlight())
                    }
                  />
                  <Button type="button" onClick={addHighlight} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Things to Do</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.thingsToDo.map((thing, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {thing}
                      <button
                        type="button"
                        onClick={() => removeThingToDo(index)}
                        className="ml-1 rounded-full hover:bg-muted">
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {thing}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newThingToDo}
                    onChange={(e) => setNewThingToDo(e.target.value)}
                    placeholder="Add a thing to do"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addThingToDo())
                    }
                  />
                  <Button type="button" onClick={addThingToDo} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="culturalSignificance">
                  Cultural Significance
                </Label>
                <Textarea
                  id="culturalSignificance"
                  name="culturalSignificance"
                  value={formData.culturalSignificance}
                  onChange={handleChange}
                  placeholder="Describe the cultural significance of this destination"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="historicalImportance">
                  Historical Importance
                </Label>
                <Textarea
                  id="historicalImportance"
                  name="historicalImportance"
                  value={formData.historicalImportance}
                  onChange={handleChange}
                  placeholder="Describe the historical importance of this destination"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="naturalFeatures">Natural Features</Label>
                <Textarea
                  id="naturalFeatures"
                  name="naturalFeatures"
                  value={formData.naturalFeatures}
                  onChange={handleChange}
                  placeholder="Describe the natural features of this destination"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Associated Tour Packages</CardTitle>
              <CardDescription>
                Manage tour packages associated with this destination.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Available Tour Packages
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select tour packages to associate with this destination.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="package-1"
                        className="rounded border-gray-300"
                        checked
                      />
                      <label
                        htmlFor="package-1"
                        className="text-sm font-medium">
                        Ethiopian Historical Route
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="package-2"
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor="package-2"
                        className="text-sm font-medium">
                        Ethiopian Nature & Wildlife
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="package-3"
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor="package-3"
                        className="text-sm font-medium">
                        Danakil Depression Expedition
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="package-4"
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor="package-4"
                        className="text-sm font-medium">
                        Omo Valley Cultural Immersion
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="package-5"
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor="package-5"
                        className="text-sm font-medium">
                        Ethiopian Coffee Trail
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Nearby Destinations
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select destinations that are near this one for
                    cross-promotion.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="nearby-1"
                        className="rounded border-gray-300"
                        checked
                      />
                      <label htmlFor="nearby-1" className="text-sm font-medium">
                        Gondar, Ethiopia
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="nearby-2"
                        className="rounded border-gray-300"
                        checked
                      />
                      <label htmlFor="nearby-2" className="text-sm font-medium">
                        Axum, Ethiopia
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="nearby-3"
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="nearby-3" className="text-sm font-medium">
                        Simien Mountains, Ethiopia
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="nearby-4"
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="nearby-4" className="text-sm font-medium">
                        Danakil Depression, Ethiopia
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media & Images</CardTitle>
              <CardDescription>
                Upload and manage images for this destination.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mainImage">Main Image</Label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt={formData.name}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Image URL"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="relative aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-2">
                      Upload Image
                    </span>
                  </div>

                  {/* Sample gallery images */}
                  <div className="relative aspect-square rounded-md overflow-hidden group">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Gallery image"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-md overflow-hidden group">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Gallery image"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-md overflow-hidden group">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Gallery image"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL (optional)</Label>
                <Input
                  id="videoUrl"
                  placeholder="e.g., https://youtube.com/watch?v=..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="virtualTourUrl">
                  Virtual Tour URL (optional)
                </Label>
                <Input
                  id="virtualTourUrl"
                  placeholder="e.g., https://virtualtour.example.com/..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
