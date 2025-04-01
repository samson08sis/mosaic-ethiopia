import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FBF7F0] dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary" />
    </div>
  );
}
