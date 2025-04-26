"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import destinations data
import destinations from "@/data/destinations";

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );

  // Filter destinations based on search query and selected continent
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent =
      selectedContinent === "all" ||
      destination.continent === selectedContinent;

    return matchesSearch && matchesContinent;
  });

  // Toggle destination selection
  const toggleDestinationSelection = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle all destinations selection
  const toggleAllDestinations = () => {
    if (selectedDestinations.length === filteredDestinations.length) {
      setSelectedDestinations([]);
    } else {
      setSelectedDestinations(filteredDestinations.map((d) => d.id));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Destinations</h1>
        <Button asChild>
          <Link href="/admin/destinations/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Destination
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Destinations</CardTitle>
          <CardDescription>
            Manage your travel destinations, including details, images, and
            associated tour packages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search destinations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={selectedContinent}
                onValueChange={setSelectedContinent}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by continent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Continents</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          filteredDestinations.length > 0 &&
                          selectedDestinations.length ===
                            filteredDestinations.length
                        }
                        onCheckedChange={toggleAllDestinations}
                        aria-label="Select all destinations"
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Activities</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDestinations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No destinations found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDestinations.map((destination) => (
                      <TableRow key={destination.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedDestinations.includes(
                              destination.id
                            )}
                            onCheckedChange={() =>
                              toggleDestinationSelection(destination.id)
                            }
                            aria-label={`Select ${destination.name}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <img
                              src={destination.image || "/placeholder.svg"}
                              alt={destination.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <span>{destination.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{destination.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium">
                              {destination.rating}
                            </span>
                            <span className="ml-2 text-muted-foreground">
                              ({destination.reviews} reviews)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {destination.activities
                              .slice(0, 2)
                              .map((activity, index) => (
                                <Badge key={index} variant="outline">
                                  {activity}
                                </Badge>
                              ))}
                            {destination.activities.length > 2 && (
                              <Badge variant="outline">
                                +{destination.activities.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/admin/destinations/${destination.id}`}>
                                  View details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/admin/destinations/${destination.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredDestinations.length} of {destinations.length}{" "}
            destinations
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
