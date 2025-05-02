type MessageContent = {
  id: string;
  content: string;
  sender: "user" | "bot" | "bot-error" | "system";
  timestamp: Date;
};

type Message = {
  id: string;
  content: MessageContent[];
  type: "chat" | "info";
  responseIndex?: number;
};

type ChatHistory = {
  role: "user" | "assistant";
  content: string;
};
