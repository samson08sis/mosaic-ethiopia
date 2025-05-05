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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const userSettingsSchema = z.object({
  enableRegistration: z.boolean().default(true),
  requireEmailVerification: z.boolean().default(true),
  allowSocialLogin: z.boolean().default(true),
  passwordMinLength: z.string().min(1, {
    message: "Minimum password length is required.",
  }),
  passwordRequireUppercase: z.boolean().default(true),
  passwordRequireNumbers: z.boolean().default(true),
  passwordRequireSymbols: z.boolean().default(false),
  sessionTimeout: z.string().min(1, {
    message: "Session timeout is required.",
  }),
  defaultUserRole: z.string().min(1, {
    message: "Default user role is required.",
  }),
});

type UserSettingsFormValues = z.infer<typeof userSettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<UserSettingsFormValues> = {
  enableRegistration: true,
  requireEmailVerification: true,
  allowSocialLogin: true,
  passwordMinLength: "8",
  passwordRequireUppercase: true,
  passwordRequireNumbers: true,
  passwordRequireSymbols: false,
  sessionTimeout: "30",
  defaultUserRole: "customer",
};

export default function UserSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserSettingsFormValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: UserSettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "User settings updated",
      description: "Your user settings have been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Registration Settings</h3>

          <FormField
            control={form.control}
            name="enableRegistration"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable User Registration
                  </FormLabel>
                  <FormDescription>
                    Allow new users to register on the website.
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
            name="requireEmailVerification"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Require Email Verification
                  </FormLabel>
                  <FormDescription>
                    Users must verify their email address before they can log
                    in.
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
            name="allowSocialLogin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Allow Social Login
                  </FormLabel>
                  <FormDescription>
                    Allow users to log in using social media accounts.
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
          <h3 className="text-lg font-medium">Password Settings</h3>

          <FormField
            control={form.control}
            name="passwordMinLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Password Length</FormLabel>
                <FormControl>
                  <Input placeholder="8" {...field} />
                </FormControl>
                <FormDescription>
                  Minimum number of characters required for passwords.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordRequireUppercase"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Require Uppercase Letters
                  </FormLabel>
                  <FormDescription>
                    Passwords must contain at least one uppercase letter.
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
            name="passwordRequireNumbers"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Require Numbers</FormLabel>
                  <FormDescription>
                    Passwords must contain at least one number.
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
            name="passwordRequireSymbols"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Require Symbols</FormLabel>
                  <FormDescription>
                    Passwords must contain at least one special character.
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
          <h3 className="text-lg font-medium">Session Settings</h3>

          <FormField
            control={form.control}
            name="sessionTimeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Timeout (minutes)</FormLabel>
                <FormControl>
                  <Input placeholder="30" {...field} />
                </FormControl>
                <FormDescription>
                  How long users stay logged in when inactive.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Role Settings</h3>

          <FormField
            control={form.control}
            name="defaultUserRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="guide">Tour Guide</SelectItem>
                    <SelectItem value="editor">Content Editor</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The default role assigned to new users.
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
