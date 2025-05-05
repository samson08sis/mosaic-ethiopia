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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const seoSettingsSchema = z.object({
  siteTitle: z.string().min(1, {
    message: "Site title is required.",
  }),
  siteDescription: z.string().min(1, {
    message: "Site description is required.",
  }),
  defaultOgImage: z.string().min(1, {
    message: "Default OG image URL is required.",
  }),
  googleAnalyticsId: z.string().optional(),
  enableSitemap: z.boolean().default(true),
  enableRobotsTxt: z.boolean().default(true),
  enableStructuredData: z.boolean().default(true),
  enableCanonicalUrls: z.boolean().default(true),
  additionalMetaTags: z.string().optional(),
});

type SeoSettingsFormValues = z.infer<typeof seoSettingsSchema>;

// This would come from your API or database
const defaultValues: Partial<SeoSettingsFormValues> = {
  siteTitle: "Travel Explorer - Ethiopian Cultural Tours",
  siteDescription:
    "Discover the beauty and culture of Ethiopia with our guided tours and cultural experiences.",
  defaultOgImage: "/images/og-image.jpg",
  googleAnalyticsId: "G-XXXXXXXXXX",
  enableSitemap: true,
  enableRobotsTxt: true,
  enableStructuredData: true,
  enableCanonicalUrls: true,
  additionalMetaTags:
    '<meta name="twitter:card" content="summary_large_image" />\n<meta name="theme-color" content="#ffffff" />',
};

export default function SeoSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SeoSettingsFormValues>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues,
  });

  async function onSubmit(data: SeoSettingsFormValues) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "SEO settings updated",
      description: "Your SEO settings have been updated successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic SEO Settings</h3>

          <FormField
            control={form.control}
            name="siteTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Travel Explorer - Ethiopian Cultural Tours"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The main title of your website (used in search results and
                  browser tabs).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="siteDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Discover the beauty and culture of Ethiopia..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief description of your website (used in search results).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultOgImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Social Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="/images/og-image.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  The default image used when sharing your site on social media.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Analytics</h3>

          <FormField
            control={form.control}
            name="googleAnalyticsId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Analytics ID</FormLabel>
                <FormControl>
                  <Input placeholder="G-XXXXXXXXXX" {...field} />
                </FormControl>
                <FormDescription>
                  Your Google Analytics measurement ID.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Technical SEO</h3>

          <FormField
            control={form.control}
            name="enableSitemap"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Sitemap</FormLabel>
                  <FormDescription>
                    Generate a sitemap.xml file for search engines.
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
            name="enableRobotsTxt"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Robots.txt</FormLabel>
                  <FormDescription>
                    Generate a robots.txt file for search engines.
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
            name="enableStructuredData"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Structured Data
                  </FormLabel>
                  <FormDescription>
                    Add JSON-LD structured data for rich search results.
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
            name="enableCanonicalUrls"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Canonical URLs
                  </FormLabel>
                  <FormDescription>
                    Add canonical URL tags to prevent duplicate content issues.
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
          <h3 className="text-lg font-medium">Advanced</h3>

          <FormField
            control={form.control}
            name="additionalMetaTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Meta Tags</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='<meta name="twitter:card" content="summary_large_image" />'
                    className="min-h-[150px] font-mono text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Additional meta tags to include in the head of your site.
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
