import { useCopy } from "@/utils/copy-util";
import { Copy } from "lucide-react";
import TickIcon from "./svgs/TickMarkSVG";

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
        <TickIcon />
      ) : (
        <Copy
          className={`h-4 w-4 opacity-70 hover:opacity-100 transition-opacity duration-300`}
        />
      )}
    </button>
  );
}
