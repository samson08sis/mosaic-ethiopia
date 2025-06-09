"use client";

import type React from "react";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";
import Link from "next/link";
import FormInput from "@/components/auth/FormInput";
import ErrorMessage from "@/components/auth/ErrorMessage";

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [generalError, setGeneralError] = useState("");

  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  // Password validation rules
  const passwordRules = [
    { rule: /.{8,}/, message: "At least 8 characters long" },
    { rule: /[A-Z]/, message: "At least one uppercase letter" },
    { rule: /[a-z]/, message: "At least one lowercase letter" },
    { rule: /\d/, message: "At least one number" },
    {
      rule: /[!@#$%^&*(),.?":{}|<>]/,
      message: "At least one special character",
    },
  ];

  // Verify token on component mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setGeneralError(
        "Invalid or missing reset token. Please request a new password reset."
      );
      return;
    }

    // Simulate token verification (in real app, this would be an API call)
    const verifyToken = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo purposes, accept any token that's not "invalid"
        if (token === "invalid") {
          setTokenValid(false);
          setGeneralError(
            "This password reset link has expired or is invalid. Please request a new one."
          );
        } else {
          setTokenValid(true);
        }
      } catch (error) {
        setTokenValid(false);
        setGeneralError("Unable to verify reset token. Please try again.");
      }
    };

    verifyToken();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    if (generalError) {
      setGeneralError("");
    }
  };

  const validatePassword = (password: string): string[] => {
    const failedRules: string[] = [];
    passwordRules.forEach(({ rule, message }) => {
      if (!rule.test(password)) {
        failedRules.push(message);
      }
    });
    return failedRules;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setGeneralError("");

    // Validate passwords
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, simulate success
      setIsSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push(
          "/login?message=Password reset successful. Please log in with your new password."
        );
      }, 3000);
    } catch (error) {
      setGeneralError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while verifying token
  if (tokenValid === null) {
    return (
      <div className="pt-20 pb-16 bg-theme min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Verifying reset token...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (tokenValid === false) {
    return (
      <div className="pt-20 pb-16 bg-theme min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Link
              href="/forgot-password"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 mb-6">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to forgot password
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Invalid Reset Link
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {generalError}
                </p>
                <Link
                  href="/forgot-password"
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors inline-block text-center">
                  Request New Reset Link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="pt-20 pb-16 bg-theme min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Password Reset Successful!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your password has been successfully reset. You will be
                  redirected to the login page shortly.
                </p>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Redirecting to login page...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main reset password form
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
            <div className="text-center mb-8">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3 w-16 h-16 mx-auto mb-4">
                <Lock className="h-10 w-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your new password below. Make sure it meets all the
                security requirements.
              </p>
            </div>

            <ErrorMessage message={generalError} />

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                id="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                required
                icon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-gray-600 dark:hover:text-gray-300">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />

              <FormInput
                id="confirmPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                required
                icon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="hover:text-gray-600 dark:hover:text-gray-300">
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />

              {/* Password Requirements */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Password Requirements:
                </h3>
                <ul className="space-y-2">
                  {passwordRules.map(({ rule, message }, index) => {
                    const isValid = rule.test(formData.password);
                    return (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle
                          className={`h-4 w-4 mr-2 ${
                            isValid
                              ? "text-green-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                        <span
                          className={
                            isValid
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }>
                          {message}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Validation Errors */}
              {errors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg p-3">
                  <ul className="text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20 pb-16 bg-theme min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
      <ResetPasswordForm />
    </Suspense>
  );
}
