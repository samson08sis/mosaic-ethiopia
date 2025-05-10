import ReactMarkdown from "react-markdown";
import CopyButton from "../ui/CopyButton";
import {
  BotMessageSquare,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Message } from "@/types/chat/types";

interface ChatBubbleProps {
  typing: boolean;
  messages: Message[];
  onIterateResponses: (message: any, next: boolean) => void;
  onRetryRequest: (messageId: string) => void;
}

export default function ChatBubble({
  typing,
  messages,
  onIterateResponses,
  onRetryRequest,
}: ChatBubbleProps) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 flex ${
            message.content[message?.responseIndex]?.sender === "user"
              ? "justify-end"
              : message.content[message?.responseIndex || 0].sender === "bot" ||
                message.content[message?.responseIndex || 0].sender ===
                  "bot-error"
              ? "justify-start"
              : "justify-center text-center italic"
          }`}>
          <div
            className={`max-w-[80%] rounded-xl p-3 ${
              message.content[message?.responseIndex || 0].sender === "user"
                ? "bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-br-none"
                : message.content[message?.responseIndex || 0].sender ===
                    "bot" ||
                  message.content[message?.responseIndex || 0].sender ===
                    "bot-error"
                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow border border-gray-100 dark:border-gray-600 rounded-bl-none"
                : ""
            }`}>
            {message.content[message?.responseIndex].sender === "bot" ||
            message.content[message?.responseIndex].sender === "bot-error" ? (
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-base font-bold mt-2 mb-1 text-gray-700"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-base font-normal mt-2 mb-1 text-cyan-300"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-base font-medium mt-1 mb-1 text-rose-400"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-sm mb-2" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 my-1 text-sm" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 my-1 text-sm" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="font-semibold text-cyan-400"
                      {...props}
                    />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic font-thin" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                }}
                remarkPlugins={[]}>
                {message.content[message?.responseIndex].content}
              </ReactMarkdown>
            ) : (
              <p className="text-sm">
                {message.content[message?.responseIndex].content}
              </p>
            )}
            {message.content[message?.responseIndex].sender !== "system" &&
              !typing && (
                <div className="flex flex-row space-x-2">
                  {/* Timestamp */}
                  {message.content[message?.responseIndex].sender !==
                    "bot-error" && (
                    <p className="text-xs mt-1 opacity-70">
                      {message.content[
                        message?.responseIndex
                      ].timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                  <CopyButton
                    textToCopy={message.content[message?.responseIndex].content}
                  />
                  {/* Retry Icon */}
                  {message.id === messages[messages.length - 1].id &&
                    message.content[message.content.length - 1].sender ===
                      "bot-error" && (
                      <button
                        disabled={typing}
                        onClick={() => onRetryRequest(message.id)}
                        className="p-1.5 self-start bg-transparent rounded-md hover:bg-white/30 transition-colors">
                        <RefreshCw
                          size={16}
                          className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                        />
                      </button>
                    )}

                  {/* Iteration icons */}
                  {message.content.length > 1 && (
                    <span className="flex justify-center items-center flow-row text-sm text-opacity-30 space-x-1">
                      <button
                        onClick={() => onIterateResponses(message, false)}
                        disabled={message?.responseIndex === 0}
                        className="p-1 self-start bg-transparent rounded-full hover:bg-white/30 transition-colors">
                        <ChevronLeft
                          className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                          size={16}
                        />
                      </button>
                      <span className="tracking-wider opacity-70">{`${
                        message.responseIndex + 1
                      }/${message.content.length}`}</span>
                      <button
                        onClick={() => onIterateResponses(message, true)}
                        disabled={
                          message?.responseIndex === message.content.length - 1
                        }
                        className="p-1 self-start bg-transparent rounded-full hover:bg-white/30 transition-colors">
                        <ChevronRight
                          className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                          size={16}
                        />
                      </button>
                    </span>
                  )}
                </div>
              )}
          </div>
        </div>
      ))}
      {typing && (
        <div className="mb-4 flex justify-start">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs font-bold">
            <BotMessageSquare size={20} className="text-white" />
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow border border-gray-100 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "600ms" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
