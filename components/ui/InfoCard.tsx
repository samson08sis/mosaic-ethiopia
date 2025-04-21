"use client";

import { X } from "lucide-react";

interface InfoCardProps {
  title: string;
  content: string;
  image?: string;
  links?: object;
  onClick?: () => void;
}

export default function InfoCard({
  title,
  content,
  image,
  links,
  onClick,
}: InfoCardProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4/5 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
      {image && (
        <div className="h-32 overflow-hidden">
          <img
            src={image || "/placeholder.svg?height=150&width=250"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <button
        onClick={() => links[0]?.action()}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 dark:ring-offset-gray-950 dark:focus:ring-gray-800 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-400">
        <X className="h-4 w-4" />
      </button>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-1 tracking-wide">
          {content}
        </p>
        {links && (
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
            {links.map((link, i) => (
              <button
                onClick={link.action}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${
                  i % 2 === 0
                    ? "border-red-600 text-gray-700 hover:bg-red-300"
                    : "border-gray-300 text-gray-700 dark:text-white hover:bg-gray-300"
                }`}>
                {link.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
