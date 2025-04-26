"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for recent bookings
const recentBookings = [
  {
    id: "B-1234",
    customer: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Historical Route",
    date: "2023-06-23",
    amount: 1299,
    status: "confirmed",
  },
  {
    id: "B-1235",
    customer: {
      name: "Michael Johnson",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Danakil Depression Expedition",
    date: "2023-06-22",
    amount: 1899,
    status: "pending",
  },
  {
    id: "B-1236",
    customer: {
      name: "Emma Williams",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Coffee Trail",
    date: "2023-06-21",
    amount: 1299,
    status: "confirmed",
  },
  {
    id: "B-1237",
    customer: {
      name: "James Brown",
      email: "james@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Omo Valley Cultural Immersion",
    date: "2023-06-20",
    amount: 1799,
    status: "cancelled",
  },
  {
    id: "B-1238",
    customer: {
      name: "Olivia Davis",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Ethiopian Nature & Wildlife",
    date: "2023-06-19",
    amount: 1599,
    status: "confirmed",
  },
];

export function RecentBookings() {
  return (
    <div className="space-y-4">
      {recentBookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={booking.customer.avatar || "/placeholder.svg"}
                alt={booking.customer.name}
              />
              <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {booking.customer.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {booking.customer.email}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">
                {booking.package}
              </p>
              <p className="text-sm text-muted-foreground">{booking.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none">
                ${booking.amount}
              </p>
              <Badge
                variant={
                  booking.status === "confirmed"
                    ? "default"
                    : booking.status === "pending"
                    ? "outline"
                    : "destructive"
                }
                className="mt-1">
                {booking.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
