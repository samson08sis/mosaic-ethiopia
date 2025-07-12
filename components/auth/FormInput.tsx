"use client";

import type { ChangeEvent, ReactNode } from "react";

import { Eye, EyeOff, LucideIcon } from "lucide-react";
import Link from "next/link";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  onToggleVisibility?: (value?: any) => void;
  showForgotPassword?: boolean;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon | ReactNode;
  className?: string;
  hasError?: boolean;
}

export default function FormInput({
  id,
  name,
  label,
  type,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  showForgotPassword = false,
  placeholder,
  required = false,
  icon: Icon,
  className = "",
  hasError = false,
}: FormInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative flex flex-col items-end">
        <input
          type={
            showPassword ? "text" : showPassword === false ? "password" : type
          }
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-3 pl-10 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            hasError
              ? "border-red-500 dark:border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder={placeholder}
          required={required}
        />
        {type === "password" && (
          <>
            <button
              type="button"
              onClick={onToggleVisibility}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {showForgotPassword && (
              <Link
                href="/forgot-password"
                className="mt-2 text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Forgot password?
              </Link>
            )}
          </>
        )}

        {Icon &&
          (typeof Icon === "function" ? (
            <Icon className={`absolute left-3 top-3.5 h-5 w-5`} />
          ) : (
            Icon
          ))}
      </div>
    </div>
  );
}
