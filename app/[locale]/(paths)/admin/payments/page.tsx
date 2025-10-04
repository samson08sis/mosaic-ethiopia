"use client";

import { useState } from "react";
import LocalizedLink from "@/components/LocalizedLink";
import {
  Search,
  Eye,
  Download,
  MoreHorizontal,
  Calendar,
  CreditCard,
  DollarSign,
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

// Mock data for payments
const payments = [
  {
    id: "TXN-987654321",
    bookingId: "B-1234",
    customer: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
    },
    amount: 1299,
    date: "2023-06-18",
    method: "Credit Card",
    status: "completed",
    package: "Ethiopian Historical Route",
  },
  {
    id: "TXN-987654322",
    bookingId: "B-1235",
    customer: {
      name: "Michael Johnson",
      email: "michael@example.com",
    },
    amount: 500,
    date: "2023-06-22",
    method: "PayPal",
    status: "pending",
    package: "Danakil Depression Expedition",
  },
  {
    id: "TXN-987654323",
    bookingId: "B-1236",
    customer: {
      name: "Emma Williams",
      email: "emma@example.com",
    },
    amount: 1299,
    date: "2023-06-21",
    method: "Bank Transfer",
    status: "completed",
    package: "Ethiopian Coffee Trail",
  },
  {
    id: "TXN-987654324",
    bookingId: "B-1237",
    customer: {
      name: "James Brown",
      email: "james@example.com",
    },
    amount: 1799,
    date: "2023-06-20",
    method: "Credit Card",
    status: "refunded",
    package: "Omo Valley Cultural Immersion",
  },
  {
    id: "TXN-987654325",
    bookingId: "B-1238",
    customer: {
      name: "Olivia Davis",
      email: "olivia@example.com",
    },
    amount: 1599,
    date: "2023-06-19",
    method: "Credit Card",
    status: "completed",
    package: "Ethiopian Nature & Wildlife",
  },
  {
    id: "TXN-987654326",
    bookingId: "B-1240",
    customer: {
      name: "Ava Wilson",
      email: "ava@example.com",
    },
    amount: 750,
    date: "2023-06-17",
    method: "PayPal",
    status: "completed",
    package: "Ethiopian Festivals & Celebrations",
  },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");

  // Filter payments based on search query, status, and method
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.package.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || payment.status === selectedStatus;
    const matchesMethod =
      selectedMethod === "all" || payment.method === selectedMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "outline";
      case "refunded":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,350.00</div>
            <p className="text-xs text-muted-foreground">
              3 transactions pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,799.00</div>
            <p className="text-xs text-muted-foreground">1 refund processed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Payments</CardTitle>
              <CardDescription>
                View and manage all payment transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search payments..."
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
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedMethod}
                    onValueChange={setSelectedMethod}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Booking</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No payments found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">
                              {payment.id}
                            </TableCell>
                            <TableCell>
                              <LocalizedLink
                                href={`/admin/bookings/${payment.bookingId}`}
                                className="text-primary hover:underline">
                                {payment.bookingId}
                              </LocalizedLink>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div>{payment.customer.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {payment.customer.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                ${payment.amount}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>{payment.date}</span>
                              </div>
                            </TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusBadgeVariant(payment.status)}>
                                {payment.status}
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
                                    <LocalizedLink
                                      href={`/admin/payments/${payment.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View details
                                    </LocalizedLink>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download receipt
                                  </DropdownMenuItem>
                                  {payment.status === "pending" && (
                                    <DropdownMenuItem>
                                      Mark as paid
                                    </DropdownMenuItem>
                                  )}
                                  {payment.status === "completed" && (
                                    <DropdownMenuItem className="text-destructive">
                                      Process refund
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
                Showing {filteredPayments.length} of {payments.length} payments
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
        <TabsContent value="completed">
          {/* Similar content but filtered for completed payments */}
        </TabsContent>
        <TabsContent value="pending">
          {/* Similar content but filtered for pending payments */}
        </TabsContent>
        <TabsContent value="refunded">
          {/* Similar content but filtered for refunded payments */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
