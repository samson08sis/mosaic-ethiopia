"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, XCircle, Clock, Mail, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const params = useParams() as { token?: string | string[] };
  const token = params?.token;
  const router = useRouter();
  const { loadUser } = useAuth();
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "expired" | "invalid"
  >("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("invalid");
        setMessage("No verification token provided.");
        return;
      }

      try {
        const response = await fetch(
          "https://mosaic-backend-li68.vercel.app/api/auth/verify-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        console.log("DATA: ", data);

        if (response.ok) {
          setStatus("success");
          setMessage(
            data.message || "Your email has been successfully verified!"
          );
          // Refresh user data to update verification status
          await loadUser();
          // Redirect to profile after 3 seconds
          setTimeout(() => {
            router.push("/profile");
          }, 3000);
        } else {
          if (response.status === 400 && data.error?.includes("expired")) {
            setStatus("expired");
            setMessage(
              "This verification link has expired. Please request a new verification email."
            );
          } else if (
            response.status === 400 &&
            data.error?.includes("invalid")
          ) {
            setStatus("invalid");
            setMessage(
              "This verification link is invalid or has already been used."
            );
          } else {
            setStatus("error");
            setMessage(
              data.error || "Failed to verify email. Please try again."
            );
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(
          "Network error. Please check your connection and try again."
        );
      }
    };

    verifyEmail();
  }, [token, router]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Clock className="w-16 h-16 text-blue-500 animate-spin" />;
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "expired":
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case "error":
      case "invalid":
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return <Mail className="w-16 h-16 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800";
      case "success":
        return "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800";
      case "expired":
        return "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "error":
      case "invalid":
        return "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800";
      default:
        return "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying Your Email...";
      case "success":
        return "Email Verified Successfully!";
      case "expired":
        return "Verification Link Expired";
      case "invalid":
        return "Invalid Verification Link";
      case "error":
        return "Verification Failed";
      default:
        return "Email Verification";
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage(
          "A new verification email has been sent to your email address."
        );
      } else {
        setMessage(
          "Failed to send verification email. Please try again later."
        );
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>

        {/* Main Card */}
        <div
          className={`rounded-2xl border-2 p-8 text-center transition-all duration-300 ${getStatusColor()}`}>
          {/* Status Icon */}
          <div className="flex justify-center mb-6">{getStatusIcon()}</div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {getStatusTitle()}
          </h1>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === "success" && (
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/profile")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
                  Go to Profile
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You'll be redirected automatically in a few seconds...
                </p>
              </div>
            )}

            {(status === "expired" || status === "invalid") && (
              <button
                onClick={handleResendVerification}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
                Send New Verification Email
              </button>
            )}

            {status === "error" && (
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
                  Try Again
                </button>
                <button
                  onClick={handleResendVerification}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
                  Send New Verification Email
                </button>
              </div>
            )}

            {status === "loading" && (
              <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-current rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}></div>
                <div
                  className="w-2 h-2 bg-current rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}></div>
              </div>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Having trouble?{" "}
            <a
              href="/contact"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
