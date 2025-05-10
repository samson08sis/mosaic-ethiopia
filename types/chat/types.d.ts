import { Document } from "mongoose";

interface IMessageContent {
  id: string;
  content: string;
  sender: "user" | "faq" | "bot" | "bot-error" | "system";
  timestamp: Date;
}

interface IMessage {
  id: string;
  content: IMessageContent[];
  type: "chat" | "info";
  responseIndex?: number;
}

interface IChatSession extends Document {
  sessionId: string;
  userId?: string; // Only for logged-in users
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

type MessageContent = {
  id: string;
  content: string;
  sender: "user" | "faq" | "bot" | "bot-error" | "system";
  timestamp: Date;
};

type Message = {
  id: string;
  content: MessageContent[];
  type: "chat" | "info";
  responseIndex: number;
};

type ChatHistory = {
  role: "user" | "assistant";
  content: string;
};
