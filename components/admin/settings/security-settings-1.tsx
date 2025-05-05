"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Clock,
  Download,
  Eye,
  EyeOff,
  Globe,
  Key,
  Lock,
  LogOut,
  RefreshCw,
  Shield,
  ShieldAlert,
  Smartphone,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Password Policy Schema
const passwordPolicySchema = z.object({
  minLength: z.string().min(1, { message: "Minimum length is required" }),
  requireUppercase: z.boolean().default(true),
  requireLowercase: z.boolean().default(true),
  requireNumbers: z.boolean().default(true),
  requireSpecialChars: z.boolean().default(true),
  passwordExpiration: z
    .string()
    .min(1, { message: "Password expiration is required" }),
  passwordHistory: z
    .string()
    .min(1, { message: "Password history is required" }),
  enforcePasswordPolicy: z.boolean().default(true),
});

// 2FA Schema
const twoFactorSchema = z.object({
  enableTwoFactor: z.boolean().default(false),
  defaultMethod: z.string().min(1, { message: "Default method is required" }),
  allowSMS: z.boolean().default(true),
  allowEmail: z.boolean().default(true),
  allowAuthenticator: z.boolean().default(true),
  requireForAdmins: z.boolean().default(true),
  requireForUsers: z.boolean().default(false),
  backupCodesCount: z
    .string()
    .min(1, { message: "Backup codes count is required" }),
});

// Session Management Schema
const sessionSchema = z.object({
  sessionTimeout: z.string().min(1, { message: "Session timeout is required" }),
  maxConcurrentSessions: z
    .string()
    .min(1, { message: "Max concurrent sessions is required" }),
  rememberMeDuration: z
    .string()
    .min(1, { message: "Remember me duration is required" }),
  enforceSignOut: z.boolean().default(false),
  trackDeviceInfo: z.boolean().default(true),
  allowPersistentSessions: z.boolean().default(true),
});

// Access Control Schema
const accessControlSchema = z.object({
  enableIpRestrictions: z.boolean().default(false),
  allowedIpAddresses: z.string().optional(),
  blockedIpAddresses: z.string().optional(),
  enableGeoRestrictions: z.boolean().default(false),
  allowedCountries: z.string().optional(),
  enableTimeRestrictions: z.boolean().default(false),
  allowedTimeStart: z.string().optional(),
  allowedTimeEnd: z.string().optional(),
  allowedDays: z.array(z.string()).default([]),
  failedLoginAttempts: z
    .string()
    .min(1, { message: "Failed login attempts is required" }),
  accountLockoutDuration: z
    .string()
    .min(1, { message: "Account lockout duration is required" }),
});

// Audit & Logging Schema
const auditLoggingSchema = z.object({
  enableAuditLogging: z.boolean().default(true),
  logLoginAttempts: z.boolean().default(true),
  logAdminActions: z.boolean().default(true),
  logUserActions: z.boolean().default(false),
  logPaymentTransactions: z.boolean().default(true),
  logBookingChanges: z.boolean().default(true),
  retentionPeriod: z
    .string()
    .min(1, { message: "Retention period is required" }),
  enableAlerts: z.boolean().default(true),
  alertEmail: z.string().email({ message: "Invalid email address" }).optional(),
});

// API Security Schema
const apiSecuritySchema = z.object({
  enableRateLimiting: z.boolean().default(true),
  requestsPerMinute: z
    .string()
    .min(1, { message: "Requests per minute is required" }),
  enableCors: z.boolean().default(true),
  allowedOrigins: z.string().optional(),
  enableApiKeys: z.boolean().default(true),
  apiKeyExpiration: z
    .string()
    .min(1, { message: "API key expiration is required" }),
  requireHttps: z.boolean().default(true),
});

// Mock data for active sessions
const activeSessions = [
  {
    id: "sess_1",
    userAgent: "Chrome 98.0.4758.102 / Windows 10",
    ipAddress: "192.168.1.1",
    location: "New York, USA",
    lastActive: "2023-04-29T12:34:56",
    device: "Desktop",
  },
  {
    id: "sess_2",
    userAgent: "Safari 15.4 / macOS 12.3",
    ipAddress: "192.168.1.2",
    location: "Los Angeles, USA",
    lastActive: "2023-04-29T11:22:33",
    device: "Desktop",
  },
  {
    id: "sess_3",
    userAgent: "Mobile Safari / iOS 15.4",
    ipAddress: "192.168.1.3",
    location: "Chicago, USA",
    lastActive: "2023-04-29T10:11:22",
    device: "Mobile",
  },
];

// Mock data for security logs
const securityLogs = [
  {
    id: "log_1",
    timestamp: "2023-04-29T12:34:56",
    action: "Login",
    user: "admin@example.com",
    ipAddress: "192.168.1.1",
    status: "Success",
  },
  {
    id: "log_2",
    timestamp: "2023-04-29T11:22:33",
    action: "Password Change",
    user: "admin@example.com",
    ipAddress: "192.168.1.1",
    status: "Success",
  },
  {
    id: "log_3",
    timestamp: "2023-04-29T10:11:22",
    action: "Login",
    user: "user@example.com",
    ipAddress: "192.168.1.4",
    status: "Failed",
  },
  {
    id: "log_4",
    timestamp: "2023-04-29T09:00:11",
    action: "2FA Setup",
    user: "admin@example.com",
    ipAddress: "192.168.1.1",
    status: "Success",
  },
  {
    id: "log_5",
    timestamp: "2023-04-29T08:45:00",
    action: "API Key Generated",
    user: "admin@example.com",
    ipAddress: "192.168.1.1",
    status: "Success",
  },
];

// Mock data for API keys
const apiKeys = [
  {
    id: "key_1",
    name: "Website Integration",
    key: "ETH_API_xxxxxxxxxxxxxxxxxxxx",
    created: "2023-03-15T10:00:00",
    expires: "2023-09-15T10:00:00",
    lastUsed: "2023-04-29T12:34:56",
  },
  {
    id: "key_2",
    name: "Mobile App",
    key: "ETH_API_yyyyyyyyyyyyyyyyyyyy",
    created: "2023-02-10T09:30:00",
    expires: "2023-08-10T09:30:00",
    lastUsed: "2023-04-29T11:22:33",
  },
];

// Default values for the forms
const passwordPolicyDefaults = {
  minLength: "12",
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  passwordExpiration: "90",
  passwordHistory: "5",
  enforcePasswordPolicy: true,
};

const twoFactorDefaults = {
  enableTwoFactor: true,
  defaultMethod: "authenticator",
  allowSMS: true,
  allowEmail: true,
  allowAuthenticator: true,
  requireForAdmins: true,
  requireForUsers: false,
  backupCodesCount: "10",
};

const sessionDefaults = {
  sessionTimeout: "60",
  maxConcurrentSessions: "5",
  rememberMeDuration: "30",
  enforceSignOut: false,
  trackDeviceInfo: true,
  allowPersistentSessions: true,
};

const accessControlDefaults = {
  enableIpRestrictions: false,
  allowedIpAddresses: "",
  blockedIpAddresses: "",
  enableGeoRestrictions: false,
  allowedCountries: "",
  enableTimeRestrictions: false,
  allowedTimeStart: "09:00",
  allowedTimeEnd: "17:00",
  allowedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  failedLoginAttempts: "5",
  accountLockoutDuration: "30",
};

const auditLoggingDefaults = {
  enableAuditLogging: true,
  logLoginAttempts: true,
  logAdminActions: true,
  logUserActions: false,
  logPaymentTransactions: true,
  logBookingChanges: true,
  retentionPeriod: "365",
  enableAlerts: true,
  alertEmail: "security@ethiopiantourapp.com",
};

const apiSecurityDefaults = {
  enableRateLimiting: true,
  requestsPerMinute: "60",
  enableCors: true,
  allowedOrigins: "https://ethiopiantourapp.com",
  enableApiKeys: true,
  apiKeyExpiration: "180",
  requireHttps: true,
};

export default function SecuritySettings1() {
  const [activeTab, setActiveTab] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [backupCodes, setBackupCodes] = useState([
    "ABCD-EFGH-IJKL",
    "MNOP-QRST-UVWX",
    "1234-5678-9ABC",
    "DEFG-HIJK-LMNO",
    "PQRS-TUVW-XYZ1",
    "2345-6789-ABCD",
    "EFGH-IJKL-MNOP",
    "QRST-UVWX-YZ12",
    "3456-7890-ABCD",
    "EFGH-IJKL-MNOP",
  ]);

  // Initialize forms
  const passwordPolicyForm = useForm({
    resolver: zodResolver(passwordPolicySchema),
    defaultValues: passwordPolicyDefaults,
  });

  const twoFactorForm = useForm({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: twoFactorDefaults,
  });

  const sessionForm = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: sessionDefaults,
  });

  const accessControlForm = useForm({
    resolver: zodResolver(accessControlSchema),
    defaultValues: accessControlDefaults,
  });

  const auditLoggingForm = useForm({
    resolver: zodResolver(auditLoggingSchema),
    defaultValues: auditLoggingDefaults,
  });

  const apiSecurityForm = useForm({
    resolver: zodResolver(apiSecuritySchema),
    defaultValues: apiSecurityDefaults,
  });

  // Form submission handlers
  async function onPasswordPolicySubmit(data) {
    await handleFormSubmit(data, "Password policy settings updated");
  }

  async function onTwoFactorSubmit(data) {
    await handleFormSubmit(data, "Two-factor authentication settings updated");
  }

  async function onSessionSubmit(data) {
    await handleFormSubmit(data, "Session management settings updated");
  }

  async function onAccessControlSubmit(data) {
    await handleFormSubmit(data, "Access control settings updated");
  }

  async function onAuditLoggingSubmit(data) {
    await handleFormSubmit(data, "Audit logging settings updated");
  }

  async function onApiSecuritySubmit(data) {
    await handleFormSubmit(data, "API security settings updated");
  }

  // Generic form submission handler
  async function handleFormSubmit(data, successMessage) {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, you would save the data to your backend
    console.log(data);

    setIsLoading(false);
    toast({
      title: "Settings updated",
      description: successMessage,
    });
  }

  // Handle session termination
  const terminateSession = async (sessionId) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Session terminated",
      description: `Session ${sessionId} has been terminated successfully.`,
    });

    setIsLoading(false);
  };

  // Handle API key deletion
  const deleteApiKey = async (keyId) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "API key deleted",
      description: `API key ${keyId} has been deleted successfully.`,
    });

    setIsLoading(false);
  };

  // Generate new backup codes
  const generateNewBackupCodes = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate new codes (in a real app, these would come from the server)
    const newCodes = [
      "WXYZ-1234-5678",
      "ABCD-9012-EFGH",
      "IJKL-3456-MNOP",
      "QRST-7890-UVWX",
      "YZ12-ABCD-3456",
      "7890-EFGH-IJKL",
      "MNOP-QRST-UVWX",
      "YZ12-3456-7890",
      "ABCD-EFGH-IJKL",
      "MNOP-QRST-UVWX",
    ];

    setBackupCodes(newCodes);
    setShowBackupCodes(true);

    toast({
      title: "New backup codes generated",
      description: "Please save these codes in a secure location.",
    });

    setIsLoading(false);
  };

  // Generate new API key
  const generateNewApiKey = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "New API key generated",
      description: "The new API key has been generated successfully.",
    });

    setIsLoading(false);
  };

  // Export security logs
  const exportSecurityLogs = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Security logs exported",
      description: "The security logs have been exported successfully.",
    });

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Password Policy</span>
          </TabsTrigger>
          <TabsTrigger value="2fa" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Two-Factor Auth</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Sessions</span>
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Access Control</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Audit & Logging</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Password Policy Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>
                Configure password requirements and expiration policies for your
                application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordPolicyForm}>
                <form
                  onSubmit={passwordPolicyForm.handleSubmit(
                    onPasswordPolicySubmit
                  )}
                  className="space-y-6">
                  <FormField
                    control={passwordPolicyForm.control}
                    name="enforcePasswordPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enforce Password Policy
                          </FormLabel>
                          <FormDescription>
                            Apply password requirements to all user accounts.
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
                      control={passwordPolicyForm.control}
                      name="minLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Password Length</FormLabel>
                          <FormControl>
                            <Input placeholder="12" {...field} />
                          </FormControl>
                          <FormDescription>
                            Minimum number of characters required for passwords.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordPolicyForm.control}
                      name="passwordHistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password History</FormLabel>
                          <FormControl>
                            <Input placeholder="5" {...field} />
                          </FormControl>
                          <FormDescription>
                            Number of previous passwords that cannot be reused.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={passwordPolicyForm.control}
                    name="passwordExpiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Expiration (days)</FormLabel>
                        <FormControl>
                          <Input placeholder="90" {...field} />
                        </FormControl>
                        <FormDescription>
                          Number of days before users are required to change
                          their password. Use 0 for no expiration.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Password Complexity Requirements
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={passwordPolicyForm.control}
                        name="requireUppercase"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Require Uppercase
                              </FormLabel>
                              <FormDescription>
                                Require at least one uppercase letter.
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
                        control={passwordPolicyForm.control}
                        name="requireLowercase"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Require Lowercase
                              </FormLabel>
                              <FormDescription>
                                Require at least one lowercase letter.
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
                        control={passwordPolicyForm.control}
                        name="requireNumbers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Require Numbers
                              </FormLabel>
                              <FormDescription>
                                Require at least one number.
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
                        control={passwordPolicyForm.control}
                        name="requireSpecialChars"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Require Special Characters
                              </FormLabel>
                              <FormDescription>
                                Require at least one special character.
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
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Password Policy"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Two-Factor Authentication Tab */}
        <TabsContent value="2fa">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Configure two-factor authentication settings for enhanced
                security.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...twoFactorForm}>
                <form
                  onSubmit={twoFactorForm.handleSubmit(onTwoFactorSubmit)}
                  className="space-y-6">
                  <FormField
                    control={twoFactorForm.control}
                    name="enableTwoFactor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable Two-Factor Authentication
                          </FormLabel>
                          <FormDescription>
                            Allow users to secure their accounts with two-factor
                            authentication.
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
                      control={twoFactorForm.control}
                      name="defaultMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default 2FA Method</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select default method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="authenticator">
                                Authenticator App
                              </SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The default method suggested to users when setting
                            up 2FA.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={twoFactorForm.control}
                      name="backupCodesCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Backup Codes Count</FormLabel>
                          <FormControl>
                            <Input placeholder="10" {...field} />
                          </FormControl>
                          <FormDescription>
                            Number of backup codes provided to users.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Allowed 2FA Methods</h3>

                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        control={twoFactorForm.control}
                        name="allowAuthenticator"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Authenticator App
                              </FormLabel>
                              <FormDescription>
                                Allow authenticator apps like Google
                                Authenticator.
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
                        control={twoFactorForm.control}
                        name="allowSMS"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">SMS</FormLabel>
                              <FormDescription>
                                Allow SMS text message verification.
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
                        control={twoFactorForm.control}
                        name="allowEmail"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email</FormLabel>
                              <FormDescription>
                                Allow email verification codes.
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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">2FA Requirements</h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={twoFactorForm.control}
                        name="requireForAdmins"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Required for Admins
                              </FormLabel>
                              <FormDescription>
                                Require 2FA for all administrator accounts.
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
                        control={twoFactorForm.control}
                        name="requireForUsers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Required for Users
                              </FormLabel>
                              <FormDescription>
                                Require 2FA for all standard user accounts.
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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Backup Codes</h3>

                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateNewBackupCodes}
                          disabled={isLoading}
                          className="w-full sm:w-auto">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Generate New Backup Codes
                        </Button>

                        {backupCodes.length > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Recovery Codes</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setShowBackupCodes(!showBackupCodes)
                                }>
                                {showBackupCodes ? (
                                  <>
                                    <EyeOff className="h-4 w-4 mr-2" /> Hide
                                    Codes
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-2" /> Show Codes
                                  </>
                                )}
                              </Button>
                            </div>

                            {showBackupCodes ? (
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                {backupCodes.map((code, index) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-muted rounded-md text-center font-mono text-sm">
                                    {code}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 bg-muted rounded-md text-center">
                                ••••••••••••••••••••••
                              </div>
                            )}

                            <p className="text-sm text-muted-foreground mt-2">
                              These codes can be used to access your account if
                              you lose access to your 2FA device. Each code can
                              only be used once.
                            </p>

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2">
                              <Download className="mr-2 h-4 w-4" />
                              Download Codes
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save 2FA Settings"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Management Tab */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Configure session timeouts and manage active sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Form {...sessionForm}>
                  <form
                    onSubmit={sessionForm.handleSubmit(onSessionSubmit)}
                    className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={sessionForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <FormControl>
                              <Input placeholder="60" {...field} />
                            </FormControl>
                            <FormDescription>
                              How long before an inactive session expires.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={sessionForm.control}
                        name="maxConcurrentSessions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Concurrent Sessions</FormLabel>
                            <FormControl>
                              <Input placeholder="5" {...field} />
                            </FormControl>
                            <FormDescription>
                              Maximum number of active sessions per user.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={sessionForm.control}
                      name="rememberMeDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Remember Me Duration (days)</FormLabel>
                          <FormControl>
                            <Input placeholder="30" {...field} />
                          </FormControl>
                          <FormDescription>
                            How long "Remember Me" sessions last.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        control={sessionForm.control}
                        name="enforceSignOut"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Force Sign Out After Password Change
                              </FormLabel>
                              <FormDescription>
                                Sign out all sessions when password is changed.
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
                        control={sessionForm.control}
                        name="trackDeviceInfo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Track Device Info
                              </FormLabel>
                              <FormDescription>
                                Record browser and device information for
                                sessions.
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
                        control={sessionForm.control}
                        name="allowPersistentSessions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Allow Persistent Sessions
                              </FormLabel>
                              <FormDescription>
                                Allow "Remember Me" functionality.
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

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Session Settings"}
                    </Button>
                  </form>
                </Form>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Active Sessions</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isLoading}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out All Sessions
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device / Browser</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>
                              <div className="flex items-center">
                                {session.device === "Mobile" ? (
                                  <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{session.userAgent}</span>
                              </div>
                            </TableCell>
                            <TableCell>{session.ipAddress}</TableCell>
                            <TableCell>{session.location}</TableCell>
                            <TableCell>
                              {new Date(session.lastActive).toLocaleString()}
                              {session.id === "sess_1" && (
                                <Badge variant="outline" className="ml-2">
                                  Current
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => terminateSession(session.id)}
                                disabled={session.id === "sess_1" || isLoading}>
                                <LogOut className="h-4 w-4" />
                                <span className="sr-only">Terminate</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Configure IP restrictions, geo-blocking, and account lockout
                settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...accessControlForm}>
                <form
                  onSubmit={accessControlForm.handleSubmit(
                    onAccessControlSubmit
                  )}
                  className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">IP Restrictions</h3>

                    <FormField
                      control={accessControlForm.control}
                      name="enableIpRestrictions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable IP Restrictions
                            </FormLabel>
                            <FormDescription>
                              Restrict admin access to specific IP addresses.
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
                        control={accessControlForm.control}
                        name="allowedIpAddresses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allowed IP Addresses</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="192.168.1.1&#10;10.0.0.1"
                                {...field}
                                disabled={
                                  !accessControlForm.watch(
                                    "enableIpRestrictions"
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Enter one IP address per line. Use CIDR notation
                              for ranges (e.g., 192.168.1.0/24).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={accessControlForm.control}
                        name="blockedIpAddresses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blocked IP Addresses</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="1.2.3.4&#10;5.6.7.8"
                                {...field}
                                disabled={
                                  !accessControlForm.watch(
                                    "enableIpRestrictions"
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Enter one IP address per line. Use CIDR notation
                              for ranges.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Geo Restrictions</h3>

                    <FormField
                      control={accessControlForm.control}
                      name="enableGeoRestrictions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Geo Restrictions
                            </FormLabel>
                            <FormDescription>
                              Restrict admin access to specific countries.
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
                      control={accessControlForm.control}
                      name="allowedCountries"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allowed Countries</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="US&#10;CA&#10;ET"
                              {...field}
                              disabled={
                                !accessControlForm.watch(
                                  "enableGeoRestrictions"
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Enter one country code per line (ISO 3166-1
                            alpha-2).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Time Restrictions</h3>

                    <FormField
                      control={accessControlForm.control}
                      name="enableTimeRestrictions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Time Restrictions
                            </FormLabel>
                            <FormDescription>
                              Restrict admin access to specific times.
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
                        control={accessControlForm.control}
                        name="allowedTimeStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allowed Time Start</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                                disabled={
                                  !accessControlForm.watch(
                                    "enableTimeRestrictions"
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={accessControlForm.control}
                        name="allowedTimeEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allowed Time End</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                                disabled={
                                  !accessControlForm.watch(
                                    "enableTimeRestrictions"
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={accessControlForm.control}
                      name="allowedDays"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Allowed Days</FormLabel>
                            <FormDescription>
                              Select days when admin access is allowed.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                              "Sunday",
                            ].map((day) => (
                              <FormField
                                key={day}
                                control={accessControlForm.control}
                                name="allowedDays"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={day}
                                      className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(day)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  day,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== day
                                                  )
                                                );
                                          }}
                                          disabled={
                                            !accessControlForm.watch(
                                              "enableTimeRestrictions"
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {day}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Lockout</h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={accessControlForm.control}
                        name="failedLoginAttempts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Failed Login Attempts</FormLabel>
                            <FormControl>
                              <Input placeholder="5" {...field} />
                            </FormControl>
                            <FormDescription>
                              Number of failed login attempts before account
                              lockout.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={accessControlForm.control}
                        name="accountLockoutDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Account Lockout Duration (minutes)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="30" {...field} />
                            </FormControl>
                            <FormDescription>
                              Duration of account lockout after failed login
                              attempts.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Access Control Settings"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit & Logging Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit & Logging</CardTitle>
              <CardDescription>
                Configure security audit logging and monitoring settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Form {...auditLoggingForm}>
                  <form
                    onSubmit={auditLoggingForm.handleSubmit(
                      onAuditLoggingSubmit
                    )}
                    className="space-y-6">
                    <FormField
                      control={auditLoggingForm.control}
                      name="enableAuditLogging"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Audit Logging
                            </FormLabel>
                            <FormDescription>
                              Record detailed logs of system activities.
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

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Log Events</h3>

                      <div className="grid gap-4 md:grid-cols-3">
                        <FormField
                          control={auditLoggingForm.control}
                          name="logLoginAttempts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Login Attempts
                                </FormLabel>
                                <FormDescription>
                                  Log all login attempts.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={
                                    !auditLoggingForm.watch(
                                      "enableAuditLogging"
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={auditLoggingForm.control}
                          name="logAdminActions"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Admin Actions
                                </FormLabel>
                                <FormDescription>
                                  Log all administrator actions.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={
                                    !auditLoggingForm.watch(
                                      "enableAuditLogging"
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={auditLoggingForm.control}
                          name="logUserActions"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  User Actions
                                </FormLabel>
                                <FormDescription>
                                  Log all user actions.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={
                                    !auditLoggingForm.watch(
                                      "enableAuditLogging"
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={auditLoggingForm.control}
                          name="logPaymentTransactions"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Payment Transactions
                                </FormLabel>
                                <FormDescription>
                                  Log all payment transactions.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={
                                    !auditLoggingForm.watch(
                                      "enableAuditLogging"
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={auditLoggingForm.control}
                          name="logBookingChanges"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Booking Changes
                                </FormLabel>
                                <FormDescription>
                                  Log all booking modifications.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={
                                    !auditLoggingForm.watch(
                                      "enableAuditLogging"
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={auditLoggingForm.control}
                        name="retentionPeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Log Retention Period (days)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="365"
                                {...field}
                                disabled={
                                  !auditLoggingForm.watch("enableAuditLogging")
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              How long to keep logs before automatic deletion.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security Alerts</h3>

                      <FormField
                        control={auditLoggingForm.control}
                        name="enableAlerts"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Enable Security Alerts
                              </FormLabel>
                              <FormDescription>
                                Send email notifications for suspicious
                                activities.
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
                        control={auditLoggingForm.control}
                        name="alertEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alert Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="security@example.com"
                                {...field}
                                disabled={
                                  !auditLoggingForm.watch("enableAlerts")
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Email address to receive security alerts.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading
                        ? "Saving..."
                        : "Save Audit & Logging Settings"}
                    </Button>
                  </form>
                </Form>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Security Logs</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportSecurityLogs}
                        disabled={isLoading}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Logs
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      {/* <TableBody>
                        {securityLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell\ */}
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
