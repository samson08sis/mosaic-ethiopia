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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Loader2, CreditCard, Banknote, Wallet } from "lucide-react";

const paymentSettingsSchema = z.object({
  currency: z.string().min(1, {
    message: "Currency is required.",
  }),
  depositPercentage: z.string().min(1, {
    message: "Deposit percentage is required.",
  }),
  enableStripe: z.boolean().default(true),
  stripePublicKey: z
    .string()
    .min(1, {
      message: "Stripe public key is required.",
    })
    .optional(),
  stripeSecretKey: z
    .string()
    .min(1, {
      message: "Stripe secret key is required.",
    })
    .optional(),
  enablePayPal: z.boolean().default(false),
  paypalClientId: z
    .string()
    .min(1, {
      message: "PayPal client ID is required.",
    })
    .optional(),
  paypalSecret: z
    .string()
    .min(1, {
      message: "PayPal secret is required.",
    })
    .optional(),
  enableBankTransfer: z.boolean().default(false),
  bankName: z
    .string()
    .min(1, {
      message: "Bank name is required.",
    })
    .optional(),
  accountNumber: z
    .string()
    .min(1, {
      message: "Account number is required.",
    })
    .optional(),
  accountName: z
    .string()
    .min(1, {
      message: "Account name is required.",
    })
    .optional(),
  swiftCode: z
    .string()
    .min(1, {
      message: "SWIFT code is required.",
    })
    .optional(),
});

type PaymentSettingsFormValues = z.infer<typeof paymentSettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<PaymentSettingsFormValues> = {
  currency: "ETB",
  depositPercentage: "30",
  enableStripe: true,
  stripePublicKey: "pk_test_...",
  stripeSecretKey: "sk_test_...",
  enablePayPal: false,
  paypalClientId: "",
  paypalSecret: "",
  enableBankTransfer: true,
  bankName: "Commercial Bank of Ethiopia",
  accountNumber: "1000123456789",
  accountName: "Travel Explorer Ltd",
  swiftCode: "CBETETAA",
};

export default function PaymentSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const form = useForm<PaymentSettingsFormValues>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: PaymentSettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "Payment settings updated",
      description: "Your payment settings have been updated successfully.",
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
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ETB">
                          Ethiopian Birr (ETB)
                        </SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The currency used for all transactions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="depositPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Percentage</FormLabel>
                    <FormControl>
                      <Input placeholder="30" {...field} />
                    </FormControl>
                    <FormDescription>
                      Percentage of total amount required as deposit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Methods</h3>

              <FormField
                control={form.control}
                name="enableStripe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Stripe</FormLabel>
                        <FormDescription>
                          Accept credit card payments via Stripe.
                        </FormDescription>
                      </div>
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
                name="enablePayPal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">PayPal</FormLabel>
                        <FormDescription>
                          Accept payments via PayPal.
                        </FormDescription>
                      </div>
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
                name="enableBankTransfer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                      <Banknote className="h-5 w-5 text-primary" />
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Bank Transfer
                        </FormLabel>
                        <FormDescription>
                          Accept payments via bank transfer.
                        </FormDescription>
                      </div>
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
          </TabsContent>

          <TabsContent value="stripe" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="stripePublicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stripe Public Key</FormLabel>
                    <FormControl>
                      <Input placeholder="pk_test_..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Stripe publishable key.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stripeSecretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stripe Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="sk_test_..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your Stripe secret key.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="text-sm font-medium">Stripe Webhook Setup</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                To handle payment events, set up a webhook in your Stripe
                dashboard pointing to:
              </p>
              <code className="mt-2 block rounded bg-muted p-2 text-xs">
                https://yourdomain.com/api/webhooks/stripe
              </code>
            </div>
          </TabsContent>

          <TabsContent value="paypal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="paypalClientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PayPal Client ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Client ID" {...field} />
                    </FormControl>
                    <FormDescription>Your PayPal client ID.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paypalSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PayPal Secret</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Secret" {...field} />
                    </FormControl>
                    <FormDescription>Your PayPal secret.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="text-sm font-medium">PayPal Environment</h3>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sandbox"
                    name="paypalEnvironment"
                    value="sandbox"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="sandbox" className="text-sm font-medium">
                    Sandbox (Testing)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="production"
                    name="paypalEnvironment"
                    value="production"
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="production" className="text-sm font-medium">
                    Production (Live)
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Commercial Bank of Ethiopia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1000123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Travel Explorer Ltd" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="swiftCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SWIFT/BIC Code</FormLabel>
                    <FormControl>
                      <Input placeholder="CBETETAA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <h3 className="text-sm font-medium">
                Bank Transfer Instructions
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                These details will be shown to customers who choose to pay via
                bank transfer. Make sure the information is accurate to avoid
                payment issues.
              </p>
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
