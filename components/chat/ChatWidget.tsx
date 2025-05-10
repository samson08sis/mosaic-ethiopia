"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  HelpCircle,
  ChevronRight,
  Info,
  ChevronUp,
  ChevronDown,
  MessageSquarePlus,
  Trash2,
  BotMessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickSuggestions from "./QuickSuggestions";
import InfoCard from "../ui/InfoCard";
import ChatBubble from "./ChatBubble";
import { ChatHistory, Message } from "@/types/chat/types";

// FAQ categories and questions
const faqCategories = [
  {
    id: "destinations",
    name: "Popular Destinations",
    questions: [
      "Tell me about Lalibela and the rock churches",
      "What is the Danakil Depression like?",
      "Can I trek in the Simien Mountains?",
      "What tribes can I visit in the Omo Valley?",
      "Is Addis Ababa worth visiting?",
    ],
  },
  {
    id: "planning",
    name: "Trip Planning",
    questions: [
      "What's the best time to visit Ethiopia?",
      "How much do your tour packages cost?",
      "How many days should I spend in Ethiopia?",
      "Is Ethiopia safe for tourists?",
      "What vaccinations do I need for Ethiopia?",
    ],
  },
  {
    id: "culture",
    name: "Culture & Experiences",
    questions: [
      "Tell me about Ethiopian coffee ceremonies",
      "What festivals can I experience in Ethiopia?",
      "What is Ethiopian food like?",
      "What languages are spoken in Ethiopia?",
      "What souvenirs should I buy in Ethiopia?",
    ],
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "today-".concat(new Date().toDateString()),
      content: [
        {
          id: "today",
          content: new Date().toDateString(),
          sender: "system",
          timestamp: new Date(),
        },
      ],
      type: "info",
      responseIndex: 0,
    },
    {
      id: "welcome",
      content: [
        {
          id: "welcome",
          content:
            "ሰላም! Hello! I'm your Mosaic travel assistant. How can I help you plan your journey to Ethiopia?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      type: "chat",
      responseIndex: 0,
    },
  ]);

  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [lastRequest, setLastRequest] = useState<Message | null>(null);
  const [lastDate, setLastDate] = useState<Date>(new Date());
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [showNewThreadConfirmation, setShowNewThreadConfirmation] =
    useState<Boolean>(false);
  const [showClearHistoryConfirmation, setShowClearHistoryConfirmation] =
    useState<Boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The input field remains focused
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();

    focusInput(); // Focus on mount
    window.addEventListener("click", focusInput);

    return () => window.removeEventListener("click", focusInput);
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const scrollToEnd = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowFaq(false); // Close FAQ when opening chat
    }
  };

  const toggleFaq = () => {
    setShowFaq(!showFaq);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateResponse = async (requestMessage: string) => {
    if (!requestMessage.trim()) return;

    try {
      const response = await axios.post("/api/ask-groq", {
        prompt: requestMessage,
        history,
      });
      // console.log(response.data?.answer);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: [
            {
              id: "res-".concat(crypto.randomUUID()),
              content: response.data.answer,
              sender: "bot",
              timestamp: new Date(),
            },
          ],
          type: "chat",
          responseIndex: 0,
        },
      ]);

      setHistory((prev) => [
        ...prev,
        { role: "user", content: requestMessage },
        { role: "assistant", content: response.data.answer },
      ]);

      setInputValue(""); // Clear input after sending
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: [
            {
              id: crypto.randomUUID(),
              content:
                axios.isAxiosError(error) && error.response?.data?.error
                  ? error.response.data.error
                  : "Couldn't process your request. Please try again or seek support on [support@mosaicethiopia.com](mailto:support@mosaicethiopia.com).",
              sender: "bot-error",
              timestamp: new Date(),
            },
          ],
          type: "chat",
          responseIndex: 0,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (messageText.trim() === "") return;

    isDifferentDate();
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: [
        {
          id: "request-".concat(messages.length.toString()),
          content: messageText,
          sender: "user",
          timestamp: new Date(),
        },
      ],
      type: "chat",
      responseIndex: 0,
    };

    setLastRequest(userMessage);
    setInputValue("");
    setShowFaq(false); // Close FAQ when sending a message

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    isDifferentDate();

    await generateResponse(userMessage.content[0].content);
  };

  const handleRetryRequest = async (requestId: string) => {
    if (!lastRequest) return;

    setIsTyping(true);
    try {
      const response = await axios.post("/api/ask-groq", {
        prompt: lastRequest.content[0].content,
        history,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === requestId
            ? {
                ...msg,
                content: [
                  ...msg.content,
                  {
                    id: "res-".concat(
                      (lastRequest.content.length + 1).toString()
                    ),
                    content: response.data.answer,
                    sender: "bot",
                    timestamp: new Date(),
                  },
                ],
                responseIndex: (msg.responseIndex ?? 0) + 1,
              }
            : msg
        )
      );
      setHistory((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: response.data.answer },
      ]);

      setInputValue("");
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === requestId
            ? {
                ...msg,
                content: [
                  ...msg.content,
                  {
                    id: "res-".concat(
                      (lastRequest.content.length + 1).toString()
                    ),
                    content:
                      axios.isAxiosError(error) && error.response?.data?.error
                        ? error.response.data.error
                        : "Couldn't process your request. Please try again or seek support on [support@mosaicethiopia.com](mailto:support@mosaicethiopia.com).",
                    sender: "bot-error",
                    timestamp: new Date(),
                  },
                ],
                responseIndex: (msg.responseIndex ?? 0) + 1,
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleIterateResponses = (message: Message, moveUp: boolean) => {
    if (moveUp) {
      if ((message.responseIndex ?? 0) < message.content.length - 1)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id
              ? {
                  ...msg,
                  responseIndex: (msg.responseIndex ?? 0) + 1,
                }
              : msg
          )
        );
    } else {
      if ((message.responseIndex ?? 0) > 0) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id
              ? {
                  ...msg,
                  responseIndex: (msg.responseIndex ?? 0) - 1,
                }
              : msg
          )
        );
      }
    }
  };

  const isDifferentDate = () => {
    const today = new Date();
    if (
      lastDate.getFullYear() !== today.getFullYear() ||
      lastDate.getMonth() !== today.getMonth() ||
      lastDate.getDate() !== today.getDate()
    ) {
      setLastDate(today);
      setMessages((prev) => [
        ...prev,
        {
          id: "today-".concat(today.toDateString()),
          content: [
            {
              id: "date",
              content: today.toDateString(),
              sender: "system",
              timestamp: new Date(),
            },
          ],
          type: "info",
          responseIndex: 0,
        },
      ]);
    }
    return true;
  };

  const handleFaqClick = async (question: string) => {
    await handleSendMessage(question);
  };

  const handleClearHistory = () => {
    setHistory([]);

    const today = new Date();
    setMessages([
      {
        id: "today-".concat(today.toDateString()),
        content: [
          {
            id: "date",
            content: today.toDateString(),
            sender: "system",
            timestamp: new Date(),
          },
        ],
        type: "info",
        responseIndex: 0,
      },
    ]);
    setShowClearHistoryConfirmation(false);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: "welcome",
          content: [
            {
              id: "welcome",
              content:
                "ሰላም! Hello! Welcome back! How can I help you plan your journey to Ethiopia?",
              sender: "bot",
              timestamp: new Date(),
            },
          ],
          type: "chat",
          responseIndex: 0,
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const handleStartNewThread = () => {
    setShowNewThreadConfirmation(true);
  };

  const confirmStartNewThread = () => {
    setHistory([]);

    setMessages((prev) => [
      ...prev,
      {
        id: "new-th-".concat(messages.length.toString()),
        content: [
          {
            id: "new-thread",
            content: "--- New thread started ---",
            sender: "system",
            timestamp: new Date(),
          },
        ],
        type: "info",
        responseIndex: 0,
      },
    ]);

    setShowNewThreadConfirmation(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-red-600 rotate-90"
            : "bg-primary-600 hover:bg-primary-700"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}>
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquare size={24} className="text-white" />
        )}
      </button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Chat Header */}
            <div className="bg-primary-600 text-white py-2 px-4 flex items-center relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <BotMessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">Mosaic Travel Guide</h3>
                <p className="text-xs opacity-80">
                  ጥያቄዎን ይጠይቁ • Ask me anything
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => setShowClearHistoryConfirmation(true)}
                className="absolute right-14 top-1/2 -translate-y-1/2 p-1.5 bg-white/20 rounded-md hover:bg-white/30 transition-colors">
                <Trash2 className="h-4 w-4 text-white" />
              </button>

              {/* FAQ Toggle Button */}
              <button
                onClick={toggleFaq}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Toggle FAQ">
                <HelpCircle className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Main content area - either chat or FAQ */}
            <div className="flex-1 overflow-hidden relative">
              {/* FAQ Panel - Slides in from the right */}
              <div>
                {showFaq && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white dark:bg-gray-900 z-10 overflow-y-auto">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          Frequently Asked Questions
                        </h3>
                        <button
                          onClick={toggleFaq}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* FAQ Categories */}
                      <div className="space-y-4">
                        {faqCategories.map((category) => (
                          <div
                            key={category.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            {/* Clickable Category Header */}
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="w-full bg-neutral-100 dark:bg-gray-800 p-3 font-medium text-gray-900 dark:text-white flex items-center justify-between transition-colors hover:bg-neutral-200 dark:hover:bg-gray-700"
                              aria-expanded={
                                expandedCategories[category.id] || false
                              }>
                              <div className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
                                {category.name}
                              </div>
                              {expandedCategories[category.id] ? (
                                <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              )}
                            </button>

                            {/* Questions - Only shown when category is expanded */}
                            <AnimatePresence>
                              {expandedCategories[category.id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden">
                                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {category.questions.map((question, idx) => (
                                      <button
                                        key={idx}
                                        className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm"
                                        onClick={() =>
                                          handleFaqClick(question)
                                        }>
                                        <span>{question}</span>
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Messages */}
              <div className="h-full overflow-y-auto p-4 bg-[#FBF7F0] dark:bg-gray-900">
                <ChatBubble
                  typing={isTyping}
                  messages={messages}
                  onIterateResponses={handleIterateResponses}
                  onRetryRequest={handleRetryRequest}
                />
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Component */}
            <QuickSuggestions
              isOpen={isOpen}
              showFaq={showFaq}
              onSuggestionClick={handleSendMessage}
            />

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                {/* New thread Button */}
                <button
                  onClick={handleStartNewThread}
                  disabled={
                    isTyping ||
                    messages[messages.length - 1].id.startsWith("new-th-") ||
                    messages.length <= 2
                  }
                  className="p-1.5 mx-1 rounded-md bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Clear chat history">
                  {/* <X className="h-4 w-4 text-white" /> */}
                  <MessageSquarePlus className="h-4 w-4 text-white" />
                </button>
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 p-1 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={inputValue.trim() === "" || isTyping}
                  className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isTyping ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              {showNewThreadConfirmation && !showClearHistoryConfirmation && (
                <InfoCard
                  content="This will start a new chat thread. Your current conversation will remain visible, but a new thread will be started."
                  title="Start a New Thread?"
                  links={[
                    {
                      text: "Cancel",
                      action: () => setShowNewThreadConfirmation(false),
                    },
                    {
                      text: "Start New Thread",
                      action: confirmStartNewThread,
                    },
                  ]}
                  // onClick={() => console.log("")}
                />
              )}
              {showClearHistoryConfirmation && !showNewThreadConfirmation && (
                <InfoCard
                  content="Confirm to Clear History."
                  title="Clear History?"
                  links={[
                    {
                      text: "Cancel",
                      action: () => setShowClearHistoryConfirmation(false),
                    },
                    {
                      text: "Confirm",
                      action: handleClearHistory,
                    },
                  ]}
                  // onClick={() => console.log("")}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
