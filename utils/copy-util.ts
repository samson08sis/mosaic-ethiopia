import { useState } from "react";

export const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return { copyText, copied };
};
