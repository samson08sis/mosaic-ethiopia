import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2 mb-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}>
        <p className="text-sm">{message}</p>
        <p className="text-xs opacity-70 mt-1 text-right">{timestamp}</p>
      </div>
    </div>
  );
}
