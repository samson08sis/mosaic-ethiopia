"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const bookingSettingsSchema = z.object({
  minAdvanceBookingDays: z.string().min(1, {
    message: "Minimum advance booking days is required.",
  }),
  maxAdvanceBookingDays: z.string().min(1, {
    message: "Maximum advance booking days is required.",
  }),
  allowCancellations: z.boolean().default(true),
  cancellationDeadlineDays: z.string().min(1, {
    message: "Cancellation deadline days is required.",
  }),
  cancellationRefundPercentage: z.string().min(1, {
    message: "Cancellation refund percentage is required.",
  }),
  allowRescheduling: z.boolean().default(true),
  reschedulingDeadlineDays: z.string().min(1, {
    message: "Rescheduling deadline days is required.",
  }),
  reschedulingFee: z.string().min(1, {
    message: "Rescheduling fee is required.",
  }),
  requireManualApproval: z.boolean().default(false),
  autoConfirmBookings: z.boolean().default(true),
  maxGroupSize: z.string().min(1, {
    message: "Maximum group size is required.",
  }),
});

type BookingSettingsFormValues = z.infer<typeof bookingSettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<BookingSettingsFormValues> = {
  minAdvanceBookingDays: "3",
  maxAdvanceBookingDays: "180",
  allowCancellations: true,
  cancellationDeadlineDays: "7",
  cancellationRefundPercentage: "80",
  allowRescheduling: true,
  reschedulingDeadlineDays: "5",
  reschedulingFee: "10",
  requireManualApproval: false,
  autoConfirmBookings: true,
  maxGroupSize: "15",
};

export default function BookingSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookingSettingsFormValues>({
    resolver: zodResolver(bookingSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: BookingSettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "Booking settings updated",
      description: "Your booking settings have been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Booking Time Frames</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="minAdvanceBookingDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Advance Booking (days)</FormLabel>
                  <FormControl>
                    <Input placeholder="3" {...field} />
                  </FormControl>
                  <FormDescription>
                    Minimum number of days in advance a booking can be made.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAdvanceBookingDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Advance Booking (days)</FormLabel>
                  <FormControl>
                    <Input placeholder="180" {...field} />
                  </FormControl>
                  <FormDescription>
                    Maximum number of days in advance a booking can be made.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cancellation Settings</h3>

          <FormField
            control={form.control}
            name="allowCancellations"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Allow Cancellations
                  </FormLabel>
                  <FormDescription>
                    Allow customers to cancel their bookings.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cancellationDeadlineDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancellation Deadline (days)</FormLabel>
                  <FormControl>
                    <Input placeholder="7" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of days before the tour when cancellation is allowed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cancellationRefundPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Percentage</FormLabel>
                  <FormControl>
                    <Input placeholder="80" {...field} />
                  </FormControl>
                  <FormDescription>
                    Percentage of payment refunded on cancellation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Rescheduling Settings</h3>

          <FormField
            control={form.control}
            name="allowRescheduling"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Allow Rescheduling
                  </FormLabel>
                  <FormDescription>
                    Allow customers to reschedule their bookings.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="reschedulingDeadlineDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rescheduling Deadline (days)</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of days before the tour when rescheduling is allowed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reschedulingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rescheduling Fee (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormDescription>
                    Percentage fee charged for rescheduling a booking.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Approval Settings</h3>

          <FormField
            control={form.control}
            name="requireManualApproval"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Require Manual Approval
                  </FormLabel>
                  <FormDescription>
                    Bookings require manual approval by an administrator.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autoConfirmBookings"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Auto-Confirm Bookings
                  </FormLabel>
                  <FormDescription>
                    Automatically confirm bookings after payment is received.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Group Settings</h3>

          <FormField
            control={form.control}
            name="maxGroupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Group Size</FormLabel>
                <FormControl>
                  <Input placeholder="15" {...field} />
                </FormControl>
                <FormDescription>
                  Maximum number of people allowed in a single booking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
