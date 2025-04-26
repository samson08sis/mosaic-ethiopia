"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for bookings
const bookings = [
  {
    id: "B-1234",
    customer: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Historical Route",
    destination: "Lalibela, Ethiopia",
    date: "2023-06-23",
    startDate: "2023-07-15",
    endDate: "2023-07-22",
    amount: 1299,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: "B-1235",
    customer: {
      name: "Michael Johnson",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Danakil Depression Expedition",
    destination: "Danakil Depression, Ethiopia",
    date: "2023-06-22",
    startDate: "2023-08-10",
    endDate: "2023-08-15",
    amount: 1899,
    status: "pending",
    paymentStatus: "pending",
  },
  {
    id: "B-1236",
    customer: {
      name: "Emma Williams",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Coffee Trail",
    destination: "Jimma, Ethiopia",
    date: "2023-06-21",
    startDate: "2023-09-05",
    endDate: "2023-09-11",
    amount: 1299,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: "B-1237",
    customer: {
      name: "James Brown",
      email: "james@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Omo Valley Cultural Immersion",
    destination: "Omo Valley, Ethiopia",
    date: "2023-06-20",
    startDate: "2023-07-25",
    endDate: "2023-08-02",
    amount: 1799,
    status: "cancelled",
    paymentStatus: "refunded",
  },
  {
    id: "B-1238",
    customer: {
      name: "Olivia Davis",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Nature & Wildlife",
    destination: "Simien Mountains, Ethiopia",
    date: "2023-06-19",
    startDate: "2023-08-20",
    endDate: "2023-08-29",
    amount: 1599,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: "B-1239",
    customer: {
      name: "William Miller",
      email: "william@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Historical Route",
    destination: "Axum, Ethiopia",
    date: "2023-06-18",
    startDate: "2023-09-15",
    endDate: "2023-09-22",
    amount: 1299,
    status: "modification_requested",
    paymentStatus: "paid",
  },
  {
    id: "B-1240",
    customer: {
      name: "Ava Wilson",
      email: "ava@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Festivals & Celebrations",
    destination: "Gondar, Ethiopia",
    date: "2023-06-17",
    startDate: "2024-01-10",
    endDate: "2024-01-19",
    amount: 1499,
    status: "confirmed",
    paymentStatus: "partially_paid",
  },
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");

  // Filter bookings based on search query and selected statuses
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.package.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "all" ||
      booking.paymentStatus === selectedPaymentStatus;

    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      case "modification_requested":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Get payment status badge variant
  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "outline";
      case "refunded":
        return "destructive";
      case "partially_paid":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="modifications">Modification Requests</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                View and manage all bookings across your platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search bookings..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="modification_requested">
                        Modification Requested
                      </SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedPaymentStatus}
                    onValueChange={setSelectedPaymentStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payments</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partially_paid">
                        Partially Paid
                      </SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No bookings found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">
                              {booking.id}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <img
                                  src={
                                    booking.customer.avatar ||
                                    "/placeholder.svg"
                                  }
                                  alt={booking.customer.name}
                                  className="h-8 w-8 rounded-full"
                                />
                                <div>
                                  <div className="font-medium">
                                    {booking.customer.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {booking.customer.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div>{booking.package}</div>
                                <div className="text-xs text-muted-foreground">
                                  {booking.destination}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                <div>
                                  <div className="text-xs">
                                    {booking.startDate}
                                  </div>
                                  <div className="text-xs">
                                    to {booking.endDate}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                ${booking.amount}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(booking.status)}>
                                {booking.status.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={getPaymentStatusBadgeVariant(
                                  booking.paymentStatus
                                )}>
                                {booking.paymentStatus.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/admin/bookings/${booking.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View details
                                    </Link>
                                  </DropdownMenuItem>
                                  {booking.status === "pending" && (
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Confirm booking
                                    </DropdownMenuItem>
                                  )}
                                  {booking.status ===
                                    "modification_requested" && (
                                    <>
                                      <DropdownMenuItem>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve modification
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Deny modification
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {(booking.status === "confirmed" ||
                                    booking.status === "pending") && (
                                    <DropdownMenuItem>
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Cancel booking
                                    </DropdownMenuItem>
                                  )}
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
                Showing {filteredBookings.length} of {bookings.length} bookings
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
        </TabsContent>

        {/* Other tabs would have similar content but filtered by status */}
        <TabsContent value="pending">
          {/* Similar content but filtered for pending bookings */}
        </TabsContent>
        <TabsContent value="confirmed">
          {/* Similar content but filtered for confirmed bookings */}
        </TabsContent>
        <TabsContent value="modifications">
          {/* Similar content but filtered for modification requests */}
        </TabsContent>
        <TabsContent value="cancelled">
          {/* Similar content but filtered for cancelled bookings */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
