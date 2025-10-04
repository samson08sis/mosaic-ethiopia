"use client";

import { useState } from "react";
import LocalizedLink from "@/components/LocalizedLink";
import {
  ArrowLeft,
  Calendar,
  User,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send,
  FileText,
  Printer,
  Mail,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock booking data
const booking = {
  id: "B-1239",
  customer: {
    name: "William Miller",
    email: "william@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  package: "Ethiopian Historical Route",
  destination: "Axum, Ethiopia",
  date: "2023-06-18",
  startDate: "2023-09-15",
  endDate: "2023-09-22",
  guests: 2,
  amount: 1299,
  status: "modification_requested",
  paymentStatus: "paid",
  paymentMethod: "Credit Card",
  transactionId: "TXN-987654321",
  notes: "Customer requested airport pickup.",
  modificationRequest: {
    date: "2023-07-10",
    type: "date_change",
    details:
      "Would like to change the dates to October 10-17, 2023 due to a work conflict.",
    status: "pending",
  },
  timeline: [
    {
      date: "2023-06-18 14:32",
      action: "Booking created",
      user: "William Miller",
    },
    {
      date: "2023-06-18 14:35",
      action: "Payment received",
      user: "System",
    },
    {
      date: "2023-06-18 15:10",
      action: "Booking confirmed",
      user: "Admin",
    },
    {
      date: "2023-07-10 09:45",
      action: "Modification requested",
      user: "William Miller",
    },
  ],
  messages: [
    {
      date: "2023-06-18 15:15",
      sender: "Admin",
      content:
        "Thank you for booking with us! Your Ethiopian Historical Route tour is confirmed. Please let us know if you have any questions.",
    },
    {
      date: "2023-07-10 09:45",
      sender: "William Miller",
      content:
        "Hi, I need to change my booking dates due to a work conflict. Is it possible to move the tour to October 10-17, 2023?",
    },
    {
      date: "2023-07-10 11:30",
      sender: "Admin",
      content:
        "We've received your request to change dates. We're checking availability and will get back to you shortly.",
    },
  ],
};

export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [newMessage, setNewMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false);

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

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  // Handle confirming the booking
  const handleConfirmBooking = () => {
    // In a real app, you would update the booking status in your backend
    console.log("Confirming booking:", booking.id);
    setConfirmDialogOpen(false);
  };

  // Handle cancelling the booking
  const handleCancelBooking = () => {
    // In a real app, you would update the booking status in your backend
    console.log("Cancelling booking:", booking.id);
    setCancelDialogOpen(false);
  };

  // Handle approving the modification request
  const handleApproveModification = () => {
    // In a real app, you would update the booking in your backend
    console.log("Approving modification for booking:", booking.id);
    setModifyDialogOpen(false);
  };

  // Handle denying the modification request
  const handleDenyModification = () => {
    // In a real app, you would update the booking in your backend
    console.log("Denying modification for booking:", booking.id);
    setModifyDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <LocalizedLink href="/admin/bookings">
              <ArrowLeft className="h-4 w-4" />
            </LocalizedLink>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Booking {booking.id}
          </h1>
          <Badge
            variant={getStatusBadgeVariant(booking.status)}
            className="ml-2">
            {booking.status.replace("_", " ")}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          {booking.status === "pending" && (
            <Button onClick={() => setConfirmDialogOpen(true)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>
          )}
          {booking.status === "modification_requested" && (
            <Button onClick={() => setModifyDialogOpen(true)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Review Modification
            </Button>
          )}
          {(booking.status === "confirmed" || booking.status === "pending") && (
            <Button
              variant="destructive"
              onClick={() => setCancelDialogOpen(true)}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Booking
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Complete information about this booking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Package
                  </div>
                  <div className="font-medium">{booking.package}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Destination
                  </div>
                  <div className="font-medium">{booking.destination}</div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Start Date
                  </div>
                  <div className="font-medium">{booking.startDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    End Date
                  </div>
                  <div className="font-medium">{booking.endDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Duration
                  </div>
                  <div className="font-medium">8 days</div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    Guests
                  </div>
                  <div className="font-medium">{booking.guests} people</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    Total Amount
                  </div>
                  <div className="font-medium">${booking.amount}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Payment Status
                  </div>
                  <Badge
                    variant={getPaymentStatusBadgeVariant(
                      booking.paymentStatus
                    )}>
                    {booking.paymentStatus.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Notes
                </div>
                <div className="text-sm">
                  {booking.notes || "No notes provided."}
                </div>
              </div>

              {booking.modificationRequest && (
                <>
                  <Separator />

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      Modification Request
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {booking.modificationRequest.type.replace("_", " ")}
                        </span>
                        <Badge variant="outline">
                          {booking.modificationRequest.status}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {booking.modificationRequest.details}
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        Requested on {booking.modificationRequest.date}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Timeline</CardTitle>
                  <CardDescription>
                    History of actions and events for this booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {booking.timeline.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                          </div>
                          {index < booking.timeline.length - 1 && (
                            <div className="h-full w-px bg-muted" />
                          )}
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="text-sm font-medium">
                            {event.action}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{event.date}</span>
                            <span className="mx-2">•</span>
                            <span>{event.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    Communication history with the customer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {booking.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.sender === "Admin" ? "justify-end" : ""
                        }`}>
                        <div
                          className={`max-w-[80%] ${
                            message.sender === "Admin"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          } rounded-lg p-3`}>
                          <div className="text-sm">{message.content}</div>
                          <div className="mt-1 flex items-center justify-between text-xs">
                            <span
                              className={
                                message.sender === "Admin"
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground"
                              }>
                              {message.sender}
                            </span>
                            <span
                              className={
                                message.sender === "Admin"
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground"
                              }>
                              {message.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    Booking documents and receipts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Booking Confirmation.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Payment Receipt.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Itinerary Details.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={booking.customer.avatar || "/placeholder.svg"}
                    alt={booking.customer.name}
                  />
                  <AvatarFallback>
                    {booking.customer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{booking.customer.name}</div>
                  <div className="text-sm text-muted-foreground">Customer</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{booking.customer.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{booking.customer.phone}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <LocalizedLink
                    href={`/admin/users/${booking.customer.email}`}>
                    View Profile
                  </LocalizedLink>
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Payment Method
                  </span>
                  <span className="text-sm font-medium">
                    {booking.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Transaction ID
                  </span>
                  <span className="text-sm font-medium">
                    {booking.transactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="text-sm font-medium">{booking.date}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm font-medium">${booking.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Taxes</span>
                  <span className="text-sm font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-bold">${booking.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" asChild>
                <LocalizedLink href={`/admin/bookings/${booking.id}/edit`}>
                  Edit Booking
                </LocalizedLink>
              </Button>
              <Button variant="outline" className="w-full">
                Send Reminder
              </Button>
              <Button variant="outline" className="w-full">
                Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm Booking Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this booking? This will notify
              the customer and update the booking status.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for cancellation (optional)"
            className="my-4"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}>
              Go Back
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modification Request Dialog */}
      <Dialog open={modifyDialogOpen} onOpenChange={setModifyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modification Request</DialogTitle>
            <DialogDescription>
              Review and respond to the customer's modification request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Request Details</h4>
              <div className="bg-muted p-3 rounded-md">
                <div className="text-sm font-medium mb-1">
                  {booking.modificationRequest?.type.replace("_", " ")}
                </div>
                <p className="text-sm">
                  {booking.modificationRequest?.details}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  Requested on {booking.modificationRequest?.date}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Response</h4>
              <Textarea placeholder="Add a note about this modification (optional)" />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => setModifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="sm:flex-1"
              onClick={handleDenyModification}>
              Deny Request
            </Button>
            <Button className="sm:flex-1" onClick={handleApproveModification}>
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
