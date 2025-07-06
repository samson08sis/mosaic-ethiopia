"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import FormInput from "./FormInput";
import SocialLoginButtons from "./SocialLoginButtons";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";

type AuthFormProps = {
  onSuccess?: () => void;
  defaultIsLogin?: boolean;
};

export default function AuthForm({
  onSuccess,
  defaultIsLogin = true,
}: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  useEffect(() => {
    if (error !== "") {
      const timeout = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialLogin = async () => {
    const authWindow = window.open(
      "https://mosaic-backend-li68.vercel.app/api/auth/google",
      "googleAuth",
      "width=500,height=600"
    );

    const checkWindow = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(checkWindow);
        window.location.reload(); // Refresh to check auth status
      }
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields");
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

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Password match validation
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords must match");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);

        // const res = await fetch(
        //   "https://mosaic-backend-li68.vercel.app/api/auth/login",
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email, password }),
        //     credentials: "include", // Required for cookies
        //   }
        // );
        // const data = await res.json();
        // console.log(data);
        // if (data.success === true) {
        //   // router.push("/");
        //   login(data?.user);
        // }
      } else {
        register(name, email, password);
        // const res = await fetch("https://mosaic-backend-li68.vercel.app/api/auth/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name, email, password }),
        //   credentials: "include", // Required for cookies
        // });
        // const data = await res.json();
        // console.log(data);
        // router.push("/dashboard");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <FormInput
            id="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        )}

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

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            {isLogin && (
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        )}

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
              {isLogin ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            <span>{isLogin ? "Sign In" : "Create Account"}</span>
          )}
        </button>
      </form>

      <div className="mt-6">
        <SocialLoginButtons onSocialLogin={handleSocialLogin} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={toggleView}
            className="ml-1 font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </>
  );
}
