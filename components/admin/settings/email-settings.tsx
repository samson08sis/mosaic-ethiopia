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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const emailSettingsSchema = z.object({
  smtpServer: z.string().min(1, {
    message: "SMTP server is required.",
  }),
  smtpPort: z.string().min(1, {
    message: "SMTP port is required.",
  }),
  smtpUsername: z.string().min(1, {
    message: "SMTP username is required.",
  }),
  smtpPassword: z.string().min(1, {
    message: "SMTP password is required.",
  }),
  senderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  senderName: z.string().min(1, {
    message: "Sender name is required.",
  }),
  enableEmailNotifications: z.boolean().default(true),
  bookingConfirmationTemplate: z.string().min(10, {
    message: "Template must be at least 10 characters.",
  }),
  bookingReminderTemplate: z.string().min(10, {
    message: "Template must be at least 10 characters.",
  }),
  paymentConfirmationTemplate: z.string().min(10, {
    message: "Template must be at least 10 characters.",
  }),
});

type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<EmailSettingsFormValues> = {
  smtpServer: "smtp.example.com",
  smtpPort: "587",
  smtpUsername: "notifications@travelexplorer.com",
  smtpPassword: "••••••••••••",
  senderEmail: "notifications@travelexplorer.com",
  senderName: "Travel Explorer",
  enableEmailNotifications: true,
  bookingConfirmationTemplate:
    "Dear {{name}},\n\nThank you for booking with Travel Explorer. Your booking #{{booking_id}} has been confirmed.\n\nDetails:\n- Tour: {{tour_name}}\n- Date: {{tour_date}}\n- Guests: {{guests}}\n\nWe look forward to providing you with an unforgettable experience!\n\nBest regards,\nTravel Explorer Team",
  bookingReminderTemplate:
    "Dear {{name}},\n\nThis is a friendly reminder about your upcoming tour with Travel Explorer.\n\nDetails:\n- Tour: {{tour_name}}\n- Date: {{tour_date}}\n- Meeting Point: {{meeting_point}}\n\nWe look forward to seeing you soon!\n\nBest regards,\nTravel Explorer Team",
  paymentConfirmationTemplate:
    "Dear {{name}},\n\nThank you for your payment of {{amount}} for booking #{{booking_id}}.\n\nYour payment has been successfully processed.\n\nBest regards,\nTravel Explorer Team",
};

export default function EmailSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");

  const form = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: EmailSettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "Email settings updated",
      description: "Your email settings have been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">SMTP Settings</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="smtpServer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Server</FormLabel>
                    <FormControl>
                      <Input placeholder="smtp.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smtpPort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Port</FormLabel>
                    <FormControl>
                      <Input placeholder="587" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="smtpUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smtpPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="senderEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="notifications@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Travel Explorer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="enableEmailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Enable or disable all email notifications.
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
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <FormField
              control={form.control}
              name="bookingConfirmationTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Confirmation Template</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter template content..."
                      className="min-h-[200px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Available variables: {{ name }}, {{ booking_id }},{" "}
                    {{ tour_name }}, {{ tour_date }}, {{ guests }}
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookingReminderTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Reminder Template</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter template content..."
                      className="min-h-[200px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Available variables: {{ name }}, {{ tour_name }},{" "}
                    {{ tour_date }}, {{ meeting_point }}
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentConfirmationTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Confirmation Template</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter template content..."
                      className="min-h-[200px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Available variables: {{ name }}, {{ amount }},{" "}
                    {{ booking_id }}
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Booking Notifications</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      Send when a booking is confirmed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Send 48 hours before tour date
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Modification</p>
                    <p className="text-sm text-muted-foreground">
                      Send when a booking is modified
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Cancellation</p>
                    <p className="text-sm text-muted-foreground">
                      Send when a booking is cancelled
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Payment Notifications</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      Send when a payment is successful
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Failed</p>
                    <p className="text-sm text-muted-foreground">
                      Send when a payment fails
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Refund Processed</p>
                    <p className="text-sm text-muted-foreground">
                      Send when a refund is processed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">Admin Notifications</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Booking Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Send to admin when a new booking is made
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New User Registration</p>
                    <p className="text-sm text-muted-foreground">
                      Send to admin when a new user registers
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contact Form Submission</p>
                    <p className="text-sm text-muted-foreground">
                      Send to admin when contact form is submitted
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
