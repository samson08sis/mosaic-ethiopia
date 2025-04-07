// components/JotFormChatbot.js
"use client"; // Mark as Client Component if using Next.js 13+

import { useEffect } from "react";
import Script from "next/script";

export default function JotFormChatbot() {
  useEffect(() => {
    // Only initialize after the script has loaded
    <script src="https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js"></script>;
    const initAgent = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          agentRenderURL:
            "https://agent.jotform.com/0195fcc4de0e7a72a80aae8ed7d51e42acad",
          rootId: "JotformAgent-0195fcc4de0e7a72a80aae8ed7d51e42acad",
          formID: "0195fcc4de0e7a72a80aae8ed7d51e42acad",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #6C73A8 0%, #6C73A8 100%)",
          buttonBackgroundColor: "#f86b11",
          buttonIconColor: "#FFFFFF",
          variant: false,
          customizations: {
            greeting: "Yes",
            greetingMessage: "Hi! How can I assist you?",
            openByDefault: "No",
            pulse: "Yes",
            position: "right",
            autoOpenChatIn: "0",
          },
          isVoice: false,
        });
      }
    };

    // Check if already loaded or wait for load
    if (window.AgentInitializer) {
      initAgent();
    } else {
      window.addEventListener("jotform-agent-loaded", initAgent);
    }

    return () => {
      window.removeEventListener("jotform-agent-loaded", initAgent);
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Trigger custom event when script loads
          window.dispatchEvent(new Event("jotform-agent-loaded"));
        }}
      />
      <div id="JotformAgent-9234jiej98urhui"></div>
    </>
  );
}
