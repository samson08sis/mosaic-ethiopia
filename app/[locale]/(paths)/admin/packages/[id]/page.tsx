"use client";

import { useState } from "react";
import LocalizedLink from "@/components/LocalizedLink";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Map,
  Bed,
  Utensils,
  Check,
  XIcon,
  Copy,
  Eye,
  BarChart3,
  Calendar,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

// Import packages data
import packages from "@/data/packages";

export default function PackageDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Find the package by ID
  const packageId = params.id as string;
  const packageData = packages.find((p) => p.id === packageId);

  // If package not found, show error
  if (!packageData) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Package Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The package you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <LocalizedLink href="/admin/packages">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Packages
          </LocalizedLink>
        </Button>
      </div>
    );
  }

  // Handle package deletion
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // In a real application, you would send a request to your API
      console.log(`Deleting package with ID: ${packageId}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Package deleted",
        description: "The tour package has been deleted successfully.",
      });

      router.push("/admin/packages");
    } catch (error) {
      console.error("Error deleting package:", error);
      toast({
        title: "Error",
        description:
          "There was an error deleting the package. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle package duplication
  const handleDuplicate = async () => {
    try {
      // In a real application, you would send a request to your API
      console.log(`Duplicating package with ID: ${packageId}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Package duplicated",
        description: "A copy of the tour package has been created.",
      });
    } catch (error) {
      console.error("Error duplicating package:", error);
      toast({
        title: "Error",
        description:
          "There was an error duplicating the package. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <LocalizedLink href="/admin/packages">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </LocalizedLink>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {packageData.name}
            </h1>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                ID: {packageData.id}
              </Badge>
              <Badge variant="secondary">Published</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <LocalizedLink href={`/packages/${packageData.id}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </LocalizedLink>
          </Button>

          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>

          <Button variant="outline" size="sm" asChild>
            <LocalizedLink href={`/admin/packages/${packageData.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </LocalizedLink>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the package &quot;
                  {packageData.name}&quot;. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Package Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={packageData.image || "/placeholder.svg"}
                  alt={packageData.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <div className="flex items-center mt-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg font-semibold">
                      {packageData.price}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg font-semibold">
                      {packageData.duration} days
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Accommodation
                  </span>
                  <div className="flex items-center mt-1">
                    <Bed className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg font-semibold">
                      {packageData.accommodation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Meals</span>
                  <div className="flex items-center mt-1">
                    <Utensils className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-lg font-semibold">
                      {packageData.meals}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {packageData.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="destinations" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>

            <TabsContent value="destinations" className="pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Destinations</CardTitle>
                  <CardDescription>
                    Places visited during this tour package.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {packageData.destinations.map((destination) => (
                      <Badge key={destination} className="text-sm py-1 px-3">
                        {destination}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Itinerary Map</h3>
                    <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                      <Map className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">
                        Map visualization would appear here
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inclusions" className="pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>What's Included & Excluded</CardTitle>
                  <CardDescription>
                    Details of what is covered in the package price.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        Inclusions
                      </h3>
                      <ul className="space-y-2">
                        {packageData.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <XIcon className="h-5 w-5 text-red-500 mr-2" />
                        Exclusions
                      </h3>
                      <ul className="space-y-2">
                        {packageData.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <XIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>
                    Activities included in this tour package.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {packageData.activities.map((activity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-sm py-1 px-3">
                        {activity}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Additional Activities (Optional)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {packageData.additionalActivities.map((activity) => (
                        <Card key={activity.id} className="overflow-hidden">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{activity.name}</h4>
                              <Badge variant="secondary">
                                ${activity.price}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="options" className="pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Package Options</CardTitle>
                  <CardDescription>
                    Alternative options that customers can choose.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Accommodation Options
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {packageData.accommodationOptions.map((option) => (
                        <Card key={option.id} className="overflow-hidden">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{option.name}</h4>
                              <Badge
                                variant={
                                  option.price === 0
                                    ? "outline"
                                    : option.price > 0
                                    ? "secondary"
                                    : "default"
                                }>
                                {option.price === 0
                                  ? "Included"
                                  : option.price > 0
                                  ? `+$${option.price}`
                                  : `-$${Math.abs(option.price)}`}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {option.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Meal Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {packageData.mealOptions.map((option) => (
                        <Card key={option.id} className="overflow-hidden">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{option.name}</h4>
                              <Badge
                                variant={
                                  option.price === 0
                                    ? "outline"
                                    : option.price > 0
                                    ? "secondary"
                                    : "default"
                                }>
                                {option.price === 0
                                  ? "Included"
                                  : option.price > 0
                                  ? `+$${option.price}`
                                  : `-$${Math.abs(option.price)}`}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {option.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Package Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Views</span>
                </div>
                <span className="font-medium">1,245</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Bookings</span>
                </div>
                <span className="font-medium">28</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Conversion Rate</span>
                </div>
                <span className="font-medium">2.25%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Revenue</span>
                </div>
                <span className="font-medium">$36,372</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <LocalizedLink href="/admin/analytics">
                  View Detailed Analytics
                </LocalizedLink>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Booking #{1000 + i}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(2023, 5, 10 + i).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge>Confirmed</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <LocalizedLink href="/admin/bookings">
                  View All Bookings
                </LocalizedLink>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Package Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge>Published</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Visibility</span>
                <span className="font-medium">Public</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Created</span>
                <span className="font-medium">Jun 10, 2023</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="font-medium">Aug 15, 2023</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" asChild>
                <LocalizedLink href={`/admin/packages/${packageData.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Package
                </LocalizedLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
