"use client";

import { useState } from "react";
import LocalizedLink from "@/components/LocalizedLink";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Shield,
  CreditCard,
  User,
  Package,
  AlertTriangle,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Mock user data - in a real app, you would fetch this from an API
const mockUsers = {
  "user-1": {
    id: "user-1",
    firstName: "Sophia",
    lastName: "Anderson",
    email: "sophia@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=128&width=128",
    status: "active",
    role: "customer",
    registrationDate: "2023-01-15",
    lastLogin: "2023-07-10",
    address: "123 Main St, Anytown, CA 94321",
    bookings: [
      {
        id: "booking-1",
        destination: "Lalibela",
        date: "2023-08-15",
        status: "confirmed",
        amount: 1250,
      },
      {
        id: "booking-2",
        destination: "Axum",
        date: "2023-10-22",
        status: "pending",
        amount: 980,
      },
      {
        id: "booking-3",
        destination: "Gondar",
        date: "2024-01-05",
        status: "confirmed",
        amount: 1450,
      },
    ],
    payments: [
      {
        id: "payment-1",
        date: "2023-07-15",
        amount: 500,
        method: "Credit Card",
        status: "completed",
      },
      {
        id: "payment-2",
        date: "2023-07-30",
        amount: 750,
        method: "Bank Transfer",
        status: "completed",
      },
      {
        id: "payment-3",
        date: "2023-09-22",
        amount: 980,
        method: "Credit Card",
        status: "pending",
      },
    ],
  },
  "admin-1": {
    id: "admin-1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=128&width=128",
    status: "active",
    role: "admin",
    registrationDate: "2022-12-01",
    lastLogin: "2023-07-10",
    address: "456 Admin Ave, Admintown, CA 94322",
    bookings: [],
    payments: [],
  },
};

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [isDeactivating, setIsDeactivating] = useState(false);

  // In a real app, you would fetch the user data from an API
  const user = mockUsers[userId as keyof typeof mockUsers];

  if (!user) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="mb-6">
          The user you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <LocalizedLink href="/admin/users">Back to Users</LocalizedLink>
        </Button>
      </div>
    );
  }

  const handleStatusChange = async () => {
    setIsDeactivating(true);

    try {
      // In a real app, you would make an API call here
      // await updateUserStatus(userId, user.status === 'active' ? 'inactive' : 'active')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newStatus = user.status === "active" ? "inactive" : "active";

      toast({
        title: `User ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`,
        description: `${user.firstName} ${user.lastName}'s account is now ${newStatus}.`,
      });

      // In a real app, this would be handled by revalidating the data
      // For now, we'll just redirect back to the users page
      router.push("/admin/users");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error updating user status",
        description:
          "There was a problem updating the user's status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // In a real app, you would make an API call here
      // await deleteUser(userId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "User deleted successfully",
        description: `${user.firstName} ${user.lastName}'s account has been permanently deleted.`,
      });

      router.push("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error deleting user",
        description: "There was a problem deleting the user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <LocalizedLink href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </LocalizedLink>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <LocalizedLink href={`/admin/users/${userId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </LocalizedLink>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {user.firstName} {user.lastName}'s account and remove all
                  associated data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
                  className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge
                    variant={user.role === "admin" ? "outline" : "secondary"}>
                    {user.role}
                  </Badge>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "secondary"
                    }>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              {user.address && (
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{user.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Registered: {user.registrationDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Last login: {user.lastLogin}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={user.status === "active" ? "destructive" : "default"}
              onClick={handleStatusChange}
              disabled={isDeactivating}>
              {isDeactivating ? (
                "Processing..."
              ) : (
                <>
                  {user.status === "active" ? (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Deactivate Account
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Activate Account
                    </>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              View and manage user details, bookings, and payment history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bookings">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">
                  <Package className="mr-2 h-4 w-4" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <User className="mr-2 h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4 pt-4">
                {user.bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">
                      No bookings found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This user hasn't made any bookings yet.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-2 px-4 text-left font-medium">
                            Booking ID
                          </th>
                          <th className="py-2 px-4 text-left font-medium">
                            Destination
                          </th>
                          <th className="py-2 px-4 text-left font-medium">
                            Date
                          </th>
                          <th className="py-2 px-4 text-left font-medium">
                            Status
                          </th>
                          <th className="py-2 px-4 text-right font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.bookings.map((booking) => (
                          <tr key={booking.id} className="border-b">
                            <td className="py-2 px-4">{booking.id}</td>
                            <td className="py-2 px-4">{booking.destination}</td>
                            <td className="py-2 px-4">{booking.date}</td>
                            <td className="py-2 px-4">
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }>
                                {booking.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-4 text-right">
                              ${booking.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="payments" className="space-y-4 pt-4">
                {user.payments.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">
                      No payments found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This user hasn't made any payments yet.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-2 px-4 text-left font-medium">
                            Payment ID
                          </th>
                          <th className="py-2 px-4 text-left font-medium">
                            Date
                          </th>
                          <th className="py-2 px-4 text-left font-medium">
                            Method
                          </th>
                          <th className="py-2 px-4 text-left font-medium">
                            Status
                          </th>
                          <th className="py-2 px-4 text-right font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.payments.map((payment) => (
                          <tr key={payment.id} className="border-b">
                            <td className="py-2 px-4">{payment.id}</td>
                            <td className="py-2 px-4">{payment.date}</td>
                            <td className="py-2 px-4">{payment.method}</td>
                            <td className="py-2 px-4">
                              <Badge
                                variant={
                                  payment.status === "completed"
                                    ? "default"
                                    : "secondary"
                                }>
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-4 text-right">
                              ${payment.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 pt-4">
                <div className="text-center py-8">
                  <User className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Activity log</h3>
                  <p className="text-sm text-muted-foreground">
                    User activity tracking is not available in this demo.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {user.status === "inactive" && (
          <Card className="md:col-span-3 border-yellow-500">
            <CardHeader className="bg-yellow-50 dark:bg-yellow-950/20">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-yellow-700 dark:text-yellow-400">
                  Account Inactive
                </CardTitle>
              </div>
              <CardDescription>
                This user account is currently inactive. The user cannot log in
                or make bookings until the account is reactivated.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                You can reactivate this account by clicking the "Activate
                Account" button.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
