"use client";

import { useEffect, useState } from "react";

type MapSectionProps = {
  title?: string;
  src?: string;
};

export default function MapSection({
  title = "Mosaic Ethiopia Location",
  src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127725.32080079896!2d38.70786319734353!3d9.03314076727154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850725f2e325%3A0x71cd4f7cda2270f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s",
}: MapSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [reloadKey, isLoading]);

  return (
    <div className="w-full h-96 mt-16 relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-theme z-10">
          <p className="mb-4 text-red-500">Failed to load the map for you.</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      )}
      <iframe
        key={reloadKey}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title={title}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className="z-0"></iframe>
    </div>
  );
}
