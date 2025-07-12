"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";
import FormInput from "./FormInput";
import SocialLoginButtons from "./SocialLoginButtons";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "@/contexts/AuthContext";
import ToggleAuthView from "./ToggleAuthView";
import SubmitButton from "./SubmitButton";

type AuthFormProps = {
  onSuccess?: () => void;
  defaultIsLogin?: boolean;
};

export default function AuthForm({
  onSuccess,
  defaultIsLogin = true,
}: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, error } = useAuth();

  const toggleView = () => {
    setIsLogin(!isLogin);
    setFormError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLogin = () => {
    const authWindow = window.open(
      "http://localhost:5000/api/auth/google",
      "googleAuth",
      "width=500,height=600"
    );

    const checkWindow = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(checkWindow);
        window.location.reload();
      }
    }, 500);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setFormError("Please fill in all fields");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setFormError("Passwords must match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      onSuccess?.();
    } catch (err: any) {
      setFormError(
        error && error.msg
          ? error.msg
          : error && error.errors && error.errors[0]
          ? error.errors[0].msg
          : `${isLogin ? "Login" : "Registration"} failed. Please try again.`
      );
      // setFormError(
      //   err.message || "Authentication failed. Please try again."
      // );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      {formError && <ErrorMessage message={formError} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <FormInput
            id="name"
            name="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            icon={
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            }
          />
        )}

        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          icon={
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          }
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword(!showPassword)}
          showForgotPassword={isLogin}
          placeholder="••••••••"
          required
          icon={
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          }
        />

        {!isLogin && (
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onToggleVisibility={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            showPassword={showConfirmPassword}
            placeholder="••••••••"
            required
            icon={
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            }
          />
        )}

        <SubmitButton isLoading={isLoading} isLogin={isLogin} />

        <SocialLoginButtons onSocialLogin={handleSocialLogin} />

        <ToggleAuthView isLogin={isLogin} onToggle={toggleView} />
      </form>
    </div>
  );
}
