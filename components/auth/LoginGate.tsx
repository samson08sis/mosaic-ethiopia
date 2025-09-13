"use client";

import { useState } from "react";
import { Mail, X, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "./AuthForm";
import { useModal } from "@/contexts/ModalContext";

export default function LoginGate() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { user } = useAuth();
  const { isOpen, closeModal, modalProps, modalType, openModal } = useModal();

  const { onSuccess, title, message, actionText } = modalProps;

  // title = "Sign in to continue",
  // message = "Please sign in to access this feature and enhance your travel experience.",
  // actionText = "this action",

  if (user && isOpen) {
    onSuccess();
    return null;
  }

  const handleEmailLogin = () => {
    setShowAuthForm(true);
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth flow
    console.log("Initiating Google OAuth...");
    // In a real app, this would redirect to Google OAuth
    alert(
      "Google OAuth would be initiated here. For demo purposes, please use email login."
    );
  };

  const handleAuthSuccess = () => {
    setShowAuthForm(false);
    onSuccess();
  };

  const handleClose = () => {
    setShowAuthForm(false);
    closeModal();
  };

  if (!isOpen || modalType !== "loginGate") return null;

  if (showAuthForm) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Sign In
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
              <X className="h-5 w-5" />
            </button>
          </div>
          <AuthForm onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Continue with Email */}
            <button
              onClick={handleEmailLogin}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              <Mail className="w-5 h-5 mr-3" />
              <span className="font-medium">Continue with Email</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            {/* Continue with Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Continue with Google</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Cancel Option */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={closeModal}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors focus:outline-none">
              Maybe later
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p>✓ Save your preferences</p>
            <p>✓ Track your bookings</p>
            <p>✓ Get personalized recommendations</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
