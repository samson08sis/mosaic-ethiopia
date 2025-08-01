"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import FormInput from "@/components/auth/FormInput";
import ErrorMessage from "@/components/auth/ErrorMessage";
import Spinner from "@/components/ui/svgs/SpinnerSVG";
import { forgotPassword } from "@/lib/api/auth";

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
      const result = await forgotPassword(email);

      if (!result.success) {
        setError(result.message || "Failed to send reset email");
        return;
      }
      setIsSubmitted(true);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "Failed to send reset email. Please try again."
      );
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
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    icon={
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    }
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70">
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <Spinner />
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
