import ChatWidget from "@/components/chat/test/ChatWidget";
import React from "react";

export default function TestingPage() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ borderWidth: 2, borderColor: "#ff44ff", height: "100vh" }}>
      <div className="px-64 py-20 rounded-full border border-gray-200 dark:border-gray-700 bg-gradient-to-b from-transparent to-[#00000044] dark:to-[#ffffff44]">
        <p className="font-arizonia text-4xl text-cyan-400">Test Page</p>
      </div>
      <ChatWidget />
    </div>
  );
}
