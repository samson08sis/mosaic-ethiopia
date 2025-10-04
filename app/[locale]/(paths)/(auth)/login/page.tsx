"use client";

import { ArrowLeft } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="pt-20 pb-16 bg-theme min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <LocalizedLink
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </LocalizedLink>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
