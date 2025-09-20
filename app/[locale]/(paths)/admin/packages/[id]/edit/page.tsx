"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, X, Upload, ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Import packages data
import packages from "@/data/packages";

// Sample destinations for selection
const availableDestinations = [
  "Lalibela",
  "Gondar",
  "Axum",
  "Bahir Dar",
  "Simien Mountains",
  "Bale Mountains",
  "Awash National Park",
  "Lake Langano",
  "Danakil Depression",
  "Erta Ale Volcano",
  "Dallol",
  "Afar Region",
  "Omo Valley",
  "Konso",
  "Jinka",
  "Turmi",
  "Addis Ababa",
  "Jimma",
  "Kaffa",
  "Yirgacheffe",
];

// Form schema
const packageFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .int()
    .positive({ message: "Duration must be a positive integer" }),
  destinations: z
    .array(z.string())
    .min(1, { message: "Select at least one destination" }),
  activities: z.array(z.string()).optional(),
  accommodation: z.string().min(1, { message: "Accommodation is required" }),
  meals: z.string().min(1, { message: "Meal plan is required" }),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

export default function EditPackagePage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.id as string;

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [newDestination, setNewDestination] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState("");
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [newInclusion, setNewInclusion] = useState("");
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [newExclusion, setNewExclusion] = useState("");
  const [additionalActivities, setAdditionalActivities] = useState<
    Array<{ id: string; name: string; price: number; description: string }>
  >([]);
  const [accommodationOptions, setAccommodationOptions] = useState<
    Array<{ id: string; name: string; price: number; description: string }>
  >([]);
  const [mealOptions, setMealOptions] = useState<
    Array<{ id: string; name: string; price: number; description: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Find the package by ID
  const packageData = packages.find((p) => p.id === packageId);

  // Initialize form
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 1,
      destinations: [],
      activities: [],
      accommodation: "",
      meals: "",
      inclusions: [],
      exclusions: [],
      status: "draft",
    },
  });

  // Load package data
  useEffect(() => {
    if (packageData) {
      form.reset({
        name: packageData.name,
        description: packageData.description || "",
        price: packageData.price,
        duration: packageData.duration,
        destinations: packageData.destinations,
        activities: packageData.activities,
        accommodation: packageData.accommodation,
        meals: packageData.meals,
        inclusions: packageData.inclusions,
        exclusions: packageData.exclusions,
        status: "published", // Assuming it's published since it exists
      });

      setSelectedDestinations(packageData.destinations);
      setActivities(packageData.activities);
      setInclusions(packageData.inclusions);
      setExclusions(packageData.exclusions);
      setAdditionalActivities(packageData.additionalActivities);
      setAccommodationOptions(packageData.accommodationOptions);
      setMealOptions(packageData.mealOptions);
      setIsLoading(false);
    } else {
      // Handle package not found
      toast({
        title: "Package not found",
        description: "The package you are trying to edit does not exist.",
        variant: "destructive",
      });
      router.push("/admin/packages");
    }
  }, [packageData, form, router]);

  // Handle destination selection
  const handleAddDestination = () => {
    if (newDestination && !selectedDestinations.includes(newDestination)) {
      const updatedDestinations = [...selectedDestinations, newDestination];
      setSelectedDestinations(updatedDestinations);
      form.setValue("destinations", updatedDestinations);
      setNewDestination("");
    }
  };

  const handleRemoveDestination = (destination: string) => {
    const updatedDestinations = selectedDestinations.filter(
      (d) => d !== destination
    );
    setSelectedDestinations(updatedDestinations);
    form.setValue("destinations", updatedDestinations);
  };

  // Handle activity management
  const handleAddActivity = () => {
    if (newActivity && !activities.includes(newActivity)) {
      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);
      form.setValue("activities", updatedActivities);
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (activity: string) => {
    const updatedActivities = activities.filter((a) => a !== activity);
    setActivities(updatedActivities);
    form.setValue("activities", updatedActivities);
  };

  // Handle inclusions management
  const handleAddInclusion = () => {
    if (newInclusion && !inclusions.includes(newInclusion)) {
      const updatedInclusions = [...inclusions, newInclusion];
      setInclusions(updatedInclusions);
      form.setValue("inclusions", updatedInclusions);
      setNewInclusion("");
    }
  };

  const handleRemoveInclusion = (inclusion: string) => {
    const updatedInclusions = inclusions.filter((i) => i !== inclusion);
    setInclusions(updatedInclusions);
    form.setValue("inclusions", updatedInclusions);
  };

  // Handle exclusions management
  const handleAddExclusion = () => {
    if (newExclusion && !exclusions.includes(newExclusion)) {
      const updatedExclusions = [...exclusions, newExclusion];
      setExclusions(updatedExclusions);
      form.setValue("exclusions", updatedExclusions);
      setNewExclusion("");
    }
  };

  const handleRemoveExclusion = (exclusion: string) => {
    const updatedExclusions = exclusions.filter((e) => e !== exclusion);
    setExclusions(updatedExclusions);
    form.setValue("exclusions", updatedExclusions);
  };

  // Handle additional activities
  const handleAddAdditionalActivity = () => {
    const newId = `activity-${Date.now()}`;
    setAdditionalActivities([
      ...additionalActivities,
      { id: newId, name: "", price: 0, description: "" },
    ]);
  };

  const handleRemoveAdditionalActivity = (id: string) => {
    setAdditionalActivities(
      additionalActivities.filter((activity) => activity.id !== id)
    );
  };

  const updateAdditionalActivity = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setAdditionalActivities(
      additionalActivities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  // Handle accommodation options
  const handleAddAccommodationOption = () => {
    const newId = `accommodation-${Date.now()}`;
    setAccommodationOptions([
      ...accommodationOptions,
      { id: newId, name: "", price: 0, description: "" },
    ]);
  };

  const handleRemoveAccommodationOption = (id: string) => {
    setAccommodationOptions(
      accommodationOptions.filter((option) => option.id !== id)
    );
  };

  const updateAccommodationOption = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setAccommodationOptions(
      accommodationOptions.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  // Handle meal options
  const handleAddMealOption = () => {
    const newId = `meal-${Date.now()}`;
    setMealOptions([
      ...mealOptions,
      { id: newId, name: "", price: 0, description: "" },
    ]);
  };

  const handleRemoveMealOption = (id: string) => {
    setMealOptions(mealOptions.filter((option) => option.id !== id));
  };

  const updateMealOption = (
    id: string,
    field: string,
    value: string | number
  ) => {
    setMealOptions(
      mealOptions.map((option) =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  // Form submission
  async function onSubmit(data: PackageFormValues) {
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      console.log({
        id: packageId,
        ...data,
        additionalActivities,
        accommodationOptions,
        mealOptions,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Package updated",
        description: "Your tour package has been updated successfully.",
      });

      router.push(`/admin/packages/${packageId}`);
    } catch (error) {
      console.error("Error updating package:", error);
      toast({
        title: "Error",
        description:
          "There was an error updating the package. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p>Loading package data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/packages/${packageId}`}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Package</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/packages/${packageId}`}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={form.handleSubmit(onSubmit)}>
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Edit the basic details of your tour package.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ethiopian Historical Route"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The name of your tour package as it will appear to
                          customers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The starting price of the package per person.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (Days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormDescription>
                            The total duration of the tour in days.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explore Ethiopia's rich history through its ancient churches, castles, and historical sites..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A detailed description of the tour package.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Set the visibility status of this package.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Destinations Tab - Same as in the new package page */}
            <TabsContent value="destinations" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Destinations</CardTitle>
                  <CardDescription>
                    Add the destinations included in this tour package.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedDestinations.map((destination) => (
                      <Badge
                        key={destination}
                        variant="secondary"
                        className="text-sm py-1 px-3">
                        {destination}
                        <button
                          type="button"
                          onClick={() => handleRemoveDestination(destination)}
                          className="ml-2 text-muted-foreground hover:text-foreground">
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {destination}</span>
                        </button>
                      </Badge>
                    ))}
                    {selectedDestinations.length === 0 && (
                      <div className="text-sm text-muted-foreground">
                        No destinations selected
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Select
                      onValueChange={setNewDestination}
                      value={newDestination}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDestinations
                          .filter((d) => !selectedDestinations.includes(d))
                          .map((destination) => (
                            <SelectItem key={destination} value={destination}>
                              {destination}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={handleAddDestination}
                      disabled={!newDestination}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Activities</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activities.map((activity) => (
                        <Badge
                          key={activity}
                          variant="outline"
                          className="text-sm py-1 px-3">
                          {activity}
                          <button
                            type="button"
                            onClick={() => handleRemoveActivity(activity)}
                            className="ml-2 text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {activity}</span>
                          </button>
                        </Badge>
                      ))}
                      {activities.length === 0 && (
                        <div className="text-sm text-muted-foreground">
                          No activities added
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add an activity"
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={handleAddActivity}
                        disabled={!newActivity}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Details Tab - Same as in the new package page */}
            <TabsContent value="details" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Package Details</CardTitle>
                  <CardDescription>
                    Specify accommodation, meals, and what's included or
                    excluded.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accommodation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accommodation</FormLabel>
                          <FormControl>
                            <Input placeholder="3-4 Star Hotels" {...field} />
                          </FormControl>
                          <FormDescription>
                            The type of accommodation included in the base
                            price.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meals</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Breakfast and Dinner"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The meal plan included in the base price.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Inclusions</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {inclusions.map((inclusion) => (
                        <Badge
                          key={inclusion}
                          variant="outline"
                          className="text-sm py-1 px-3">
                          {inclusion}
                          <button
                            type="button"
                            onClick={() => handleRemoveInclusion(inclusion)}
                            className="ml-2 text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {inclusion}</span>
                          </button>
                        </Badge>
                      ))}
                      {inclusions.length === 0 && (
                        <div className="text-sm text-muted-foreground">
                          No inclusions added
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add an inclusion (e.g., Airport transfers)"
                        value={newInclusion}
                        onChange={(e) => setNewInclusion(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={handleAddInclusion}
                        disabled={!newInclusion}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Exclusions</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exclusions.map((exclusion) => (
                        <Badge
                          key={exclusion}
                          variant="outline"
                          className="text-sm py-1 px-3">
                          {exclusion}
                          <button
                            type="button"
                            onClick={() => handleRemoveExclusion(exclusion)}
                            className="ml-2 text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {exclusion}</span>
                          </button>
                        </Badge>
                      ))}
                      {exclusions.length === 0 && (
                        <div className="text-sm text-muted-foreground">
                          No exclusions added
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add an exclusion (e.g., International flights)"
                        value={newExclusion}
                        onChange={(e) => setNewExclusion(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={handleAddExclusion}
                        disabled={!newExclusion}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Options Tab - Same as in the new package page */}
            <TabsContent value="options" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Options</CardTitle>
                  <CardDescription>
                    Add optional activities and upgrades that customers can add
                    to their package.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        Additional Activities
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddAdditionalActivity}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Activity
                      </Button>
                    </div>

                    {additionalActivities.length === 0 ? (
                      <div className="text-sm text-muted-foreground mb-4">
                        No additional activities added. These are optional
                        activities that customers can add to their package.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {additionalActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="border rounded-md p-4 relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() =>
                                handleRemoveAdditionalActivity(activity.id)
                              }>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove activity</span>
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <FormLabel>Activity Name</FormLabel>
                                <Input
                                  value={activity.name}
                                  onChange={(e) =>
                                    updateAdditionalActivity(
                                      activity.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Traditional Coffee Ceremony"
                                />
                              </div>
                              <div>
                                <FormLabel>Price (USD)</FormLabel>
                                <Input
                                  type="number"
                                  value={activity.price}
                                  onChange={(e) =>
                                    updateAdditionalActivity(
                                      activity.id,
                                      "price",
                                      Number.parseFloat(e.target.value)
                                    )
                                  }
                                  placeholder="35"
                                />
                              </div>
                            </div>

                            <div>
                              <FormLabel>Description</FormLabel>
                              <Textarea
                                value={activity.description}
                                onChange={(e) =>
                                  updateAdditionalActivity(
                                    activity.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Experience Ethiopia's famous coffee ceremony with local families"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        Accommodation Options
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddAccommodationOption}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Option
                      </Button>
                    </div>

                    {accommodationOptions.length === 0 ? (
                      <div className="text-sm text-muted-foreground mb-4">
                        No accommodation options added. These are alternative
                        accommodation options that customers can choose.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {accommodationOptions.map((option) => (
                          <div
                            key={option.id}
                            className="border rounded-md p-4 relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() =>
                                handleRemoveAccommodationOption(option.id)
                              }>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove option</span>
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <FormLabel>Option Name</FormLabel>
                                <Input
                                  value={option.name}
                                  onChange={(e) =>
                                    updateAccommodationOption(
                                      option.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="4-5 Star Hotels"
                                />
                              </div>
                              <div>
                                <FormLabel>Price Difference (USD)</FormLabel>
                                <Input
                                  type="number"
                                  value={option.price}
                                  onChange={(e) =>
                                    updateAccommodationOption(
                                      option.id,
                                      "price",
                                      Number.parseFloat(e.target.value)
                                    )
                                  }
                                  placeholder="350"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Use negative values for cheaper options
                                </p>
                              </div>
                            </div>

                            <div>
                              <FormLabel>Description</FormLabel>
                              <Textarea
                                value={option.description}
                                onChange={(e) =>
                                  updateAccommodationOption(
                                    option.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Upgrade to premium hotels where available"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Meal Options</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddMealOption}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Option
                      </Button>
                    </div>

                    {mealOptions.length === 0 ? (
                      <div className="text-sm text-muted-foreground mb-4">
                        No meal options added. These are alternative meal plans
                        that customers can choose.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {mealOptions.map((option) => (
                          <div
                            key={option.id}
                            className="border rounded-md p-4 relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => handleRemoveMealOption(option.id)}>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove option</span>
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <FormLabel>Option Name</FormLabel>
                                <Input
                                  value={option.name}
                                  onChange={(e) =>
                                    updateMealOption(
                                      option.id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Full Board"
                                />
                              </div>
                              <div>
                                <FormLabel>Price Difference (USD)</FormLabel>
                                <Input
                                  type="number"
                                  value={option.price}
                                  onChange={(e) =>
                                    updateMealOption(
                                      option.id,
                                      "price",
                                      Number.parseFloat(e.target.value)
                                    )
                                  }
                                  placeholder="200"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Use negative values for cheaper options
                                </p>
                              </div>
                            </div>

                            <div>
                              <FormLabel>Description</FormLabel>
                              <Textarea
                                value={option.description}
                                onChange={(e) =>
                                  updateMealOption(
                                    option.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="All meals included"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab - Same as in the new package page */}
            <TabsContent value="media" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>
                    Upload images and other media for this package.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="mx-auto flex flex-col items-center justify-center gap-1">
                      <div className="rounded-full bg-muted p-3">
                        <Upload className="h-6 w-6" />
                      </div>
                      <h3 className="mt-2 text-lg font-semibold">
                        Upload package images
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your images here or click to browse
                      </p>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        multiple
                      />
                      <Button variant="secondary" size="sm" asChild>
                        <label htmlFor="picture">Choose files</label>
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG or WEBP up to 10MB
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Featured Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This image will be used as the main image for the package
                      in listings and headers.
                    </p>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-md bg-muted overflow-hidden">
                          <img
                            src={packageData?.image || "/placeholder.svg"}
                            alt="Featured image"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Current featured image
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Select a different image or upload a new one
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/packages/${packageId}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
