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
import {
  Loader2,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  HotelIcon as TripAdvisor,
} from "lucide-react";

const socialSettingsSchema = z.object({
  facebookUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.string().length(0))
    .optional(),
  instagramUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.string().length(0))
    .optional(),
  twitterUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.string().length(0))
    .optional(),
  youtubeUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.string().length(0))
    .optional(),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.string().length(0))
    .optional(),
  tripadvisorUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .or(z.string().length(0))
    .optional(),
  enableSocialSharing: z.boolean().default(true),
  enableFacebookComments: z.boolean().default(false),
  facebookAppId: z.string().optional(),
  enableTwitterCards: z.boolean().default(true),
});

type SocialSettingsFormValues = z.infer<typeof socialSettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<SocialSettingsFormValues> = {
  facebookUrl: "https://facebook.com/travelexplorer",
  instagramUrl: "https://instagram.com/travelexplorer",
  twitterUrl: "https://twitter.com/travelexplorer",
  youtubeUrl: "https://youtube.com/travelexplorer",
  linkedinUrl: "https://linkedin.com/company/travelexplorer",
  tripadvisorUrl: "https://tripadvisor.com/travelexplorer",
  enableSocialSharing: true,
  enableFacebookComments: false,
  facebookAppId: "",
  enableTwitterCards: true,
};

export default function SocialSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SocialSettingsFormValues>({
    resolver: zodResolver(socialSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: SocialSettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "Social settings updated",
      description: "Your social media settings have been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Media Profiles</h3>

          <FormField
            control={form.control}
            name="facebookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" /> Facebook URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://facebook.com/yourpage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/youraccount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/youraccount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" /> YouTube URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/yourchannel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/company/yourcompany"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tripadvisorUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <TripAdvisor className="h-4 w-4" /> TripAdvisor URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://tripadvisor.com/yourpage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Sharing</h3>

          <FormField
            control={form.control}
            name="enableSocialSharing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Social Sharing
                  </FormLabel>
                  <FormDescription>
                    Show social sharing buttons on tour and destination pages.
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
            name="enableTwitterCards"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Twitter Cards
                  </FormLabel>
                  <FormDescription>
                    Add Twitter card meta tags for rich previews when sharing.
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
          <h3 className="text-lg font-medium">Facebook Integration</h3>

          <FormField
            control={form.control}
            name="enableFacebookComments"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Facebook Comments
                  </FormLabel>
                  <FormDescription>
                    Allow visitors to comment on tours using Facebook comments.
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
            name="facebookAppId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook App ID</FormLabel>
                <FormControl>
                  <Input placeholder="123456789012345" {...field} />
                </FormControl>
                <FormDescription>
                  Required for Facebook comments and insights.
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
