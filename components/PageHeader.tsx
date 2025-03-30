"use client";

import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string | ReactNode;
  backgroundImage: string;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
  overlayColor = "primary",
  overlayOpacity = 0.7,
  height = "py-16",
  children,
  className = "",
}: PageHeaderProps) {
  // Map color names to Tailwind color classes
  const colorMap = {
    primary: "bg-primary",
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
  };

  const bgColorClass =
    colorMap[overlayColor as keyof typeof colorMap] || "bg-primary";

  return (
    <div className={`relative ${height} ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}></div>

      {/* Color Overlay */}
      <div
        className={`absolute inset-0 ${bgColorClass}`}
        style={{ opacity: overlayOpacity }}></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-white z-10">
        <div className="text-center">
          <h1
            className={`${
              title.includes("About") || title.includes("Contact")
                ? "font-arizonia"
                : ""
            } text-4xl md:text-5xl lg:text-6xl font-bold mb-4`}>
            {title}
          </h1>
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p className="text-xl max-w-3xl mx-auto mb-8">{subtitle}</p>
            ) : (
              subtitle
            ))}
          {children}
        </div>
      </div>
    </div>
  );
}
