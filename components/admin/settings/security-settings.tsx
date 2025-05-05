"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const securitySettingsSchema = z.object({
  enableTwoFactorAuth: z.boolean().default(false),
  enforceStrongPasswords: z.boolean().default(true),
  maxLoginAttempts: z.string().min(1, {
    message: "Maximum login attempts is required.",
  }),
  lockoutDuration: z.string().min(1, {
    message: "Lockout duration is required.",
  }),
  sessionTimeout: z.string().min(1, {
    message: "Session timeout is required.",
  }),
  enableSSL: z.boolean().default(true),
  enableCaptcha: z.boolean().default(true),
  captchaType: z.string().min(1, {
    message: "Captcha type is required.",
  }),
  captchaSiteKey: z.string().optional(),
  captchaSecretKey: z.string().optional(),
  dataRetentionPeriod: z.string().min(1, {
    message: "Data retention period is required.",
  }),
});

type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<SecuritySettingsFormValues> = {
  enableTwoFactorAuth: false,
  enforceStrongPasswords: true,
  maxLoginAttempts: "5",
  lockoutDuration: "30",
  sessionTimeout: "60",
  enableSSL: true,
  enableCaptcha: true,
  captchaType: "recaptcha",
  captchaSiteKey: "6LcXXXXXXXXXXXXXXXXXXXX",
  captchaSecretKey: "6LcXXXXXXXXXXXXXXXXXXXX",
  dataRetentionPeriod: "365",
};

export default function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: SecuritySettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "Security settings updated",
      description: "Your security settings have been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Authentication Security</h3>

          <FormField
            control={form.control}
            name="enableTwoFactorAuth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Two-Factor Authentication
                  </FormLabel>
                  <FormDescription>
                    Require administrators to use 2FA when logging in.
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
            name="enforceStrongPasswords"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enforce Strong Passwords
                  </FormLabel>
                  <FormDescription>
                    Require complex passwords for all admin accounts.
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
              name="maxLoginAttempts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Login Attempts</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of failed login attempts before account lockout.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lockoutDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lockout Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input placeholder="30" {...field} />
                  </FormControl>
                  <FormDescription>
                    Duration of account lockout after failed login attempts.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sessionTimeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Timeout (minutes)</FormLabel>
                <FormControl>
                  <Input placeholder="60" {...field} />
                </FormControl>
                <FormDescription>
                  How long before an inactive admin session expires.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Connection Security</h3>

          <FormField
            control={form.control}
            name="enableSSL"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Force SSL</FormLabel>
                  <FormDescription>
                    Require HTTPS for all admin dashboard access.
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
          <h3 className="text-lg font-medium">CAPTCHA Settings</h3>

          <FormField
            control={form.control}
            name="enableCaptcha"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable CAPTCHA</FormLabel>
                  <FormDescription>
                    Protect forms with CAPTCHA to prevent spam and bots.
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
            name="captchaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CAPTCHA Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CAPTCHA type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="recaptcha">Google reCAPTCHA</SelectItem>
                    <SelectItem value="hcaptcha">hCaptcha</SelectItem>
                    <SelectItem value="turnstile">Cloudflare</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
