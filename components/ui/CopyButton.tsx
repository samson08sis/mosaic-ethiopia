import { useCopy } from "@/utils/copy-util";
import { Copy, CopyCheck } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
}

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const { copyText, copied } = useCopy();

  return (
    <button
      onClick={() => copyText(textToCopy)}
      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      aria-label="Copy to clipboard">
      {copied ? (
        <svg
          className="w-4 h-4 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <Copy
          className={`h-4 w-4 opacity-70 hover:opacity-100 transition-opacity duration-300`}
        />
      )}
    </button>
  );
}
