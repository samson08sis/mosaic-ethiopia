"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  MailCheck,
  Verified,
} from "lucide-react";

export default function ProfileManagement() {
  const { user, isAuthenticated, updateUserProfile, sendVerificationEmail } =
    useAuth();
  const router = useRouter();

  if (user?.verified) {
    user.verified = true;
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    bio: "",
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else if (user) {
      // Populate form with user data
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        country: user.country || "",
        bio: user.bio || "",
        preferences: {
          notifications: user.preferences?.notifications ?? true,
          newsletter: user.preferences?.newsletter ?? true,
          darkMode: user.preferences?.darkMode ?? false,
        },
      });
    }
  }, [isAuthenticated, router, user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name.split(".")[1]]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendVerification = async () => {
    setIsVerifying(true);
    setVerificationMessage("");

    const result = await sendVerificationEmail();

    if (result.success) {
      setVerificationMessage("Verification email sent! Check your inbox.");
      if (result.verificationUrl) {
        setVerificationUrl(result.verificationUrl);
      }
    } else {
      setVerificationMessage(result.message);
    }

    setIsVerifying(false);

    // Clear message after 5 seconds
    setTimeout(() => {
      setVerificationMessage("");
      setVerificationUrl("");
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user profile in context
    updateUserProfile({
      ...user,
      ...formData,
    });

    setSuccess(true);
    setIsSubmitting(false);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Profile Settings
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-primary to-primary-600 h-32">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-gray-100 dark:bg-gray-700 p-1 rounded-full border border-gray-300 dark:border-gray-600">
                  <Camera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Email Verification Section */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          user?.verified ? "bg-green-500" : "bg-yellow-500"
                        }`}></div>
                      {user?.verified === true && (
                        <Verified className="h-8 w-8 text-green-500 animate-in" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user?.email || "No Email Provided"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.verified
                            ? "Your email is verified"
                            : "Please verify your email address"}
                        </p>
                      </div>
                    </div>
                    {!user?.verified && (
                      <button
                        onClick={handleSendVerification}
                        disabled={isVerifying}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
                          isVerifying
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
                        }`}>
                        {isVerifying ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <MailCheck className="h-4 w-4 text-gray-200 inline-block" />{" "}
                            Verify Email
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {verificationMessage && (
                    <div
                      className={`mt-3 p-3 rounded-lg text-sm ${
                        verificationMessage.includes("sent")
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                      }`}>
                      {verificationMessage}
                      {verificationUrl && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            For testing, you can use this link:
                          </p>
                          <a
                            href={verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline text-xs break-all">
                            {verificationUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white">
                      <option value="">Select Country</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us a little about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preferences.notifications"
                      name="preferences.notifications"
                      checked={formData.preferences.notifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="preferences.notifications"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Receive booking notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preferences.newsletter"
                      name="preferences.newsletter"
                      checked={formData.preferences.newsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="preferences.newsletter"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Subscribe to newsletter
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preferences.darkMode"
                      name="preferences.darkMode"
                      checked={formData.preferences.darkMode}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="preferences.darkMode"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Use dark mode by default
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
