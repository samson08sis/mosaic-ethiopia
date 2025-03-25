"use client";

import type React from "react";

import type { ReactNode } from "react";

type FormInputProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function FormInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  rightIcon,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full p-3 ${
            icon ? "pl-10" : ""
          } border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
          placeholder={placeholder}
          required={required}
        />
        {icon && (
          <span className="absolute left-3 top-3.5 text-gray-400">{icon}</span>
        )}
        {rightIcon && (
          <span className="absolute right-3 top-3.5 text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
}
