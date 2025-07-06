"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import FormInput from "@/components/auth/FormInput";
import ErrorMessage from "@/components/auth/ErrorMessage";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await fetch(
        "https://mosaic-backend-li68.vercel.app/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-theme min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Link
            href="/login"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to login
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Reset Your Password
            </h1>

            {isSubmitted ? (
              <div className="text-center">
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                  <p>
                    Password reset instructions have been sent to your email.
                  </p>
                  <p className="mt-2">
                    Please check your inbox and follow the instructions to reset
                    your password.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-block mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                  Return to Login
                </Link>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Enter your email address and we'll send you instructions to
                  reset your password.
                </p>

                <ErrorMessage message={error} />

                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    icon={<Mail className="h-5 w-5" />}
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70">
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span>Send Reset Instructions</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
