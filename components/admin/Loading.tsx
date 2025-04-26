import { Shield } from "lucide-react";
import React from "react";
import Loader from "@/components/Loading";

export default function AdminLoader() {
  return (
    <div className="flex justify-center items-center flex-col font-arizonia text-base text-primary">
      <span className="flex flex-row space-x-2">
        <Shield className="h-4 w-4" />
        <span>Loading...</span>
      </span>
      <Loader />
    </div>
  );
}
