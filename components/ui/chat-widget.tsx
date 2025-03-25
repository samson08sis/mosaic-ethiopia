"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, HelpCircle, MessageSquareMore } from "lucide-react";
import { ChatBubble } from "./chat-bubble";
import { FAQOptions } from "./faq-options";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

// FAQ data structure
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Ethiopian Tours assistant. How can I help you today?",
      isUser: false,
      timestamp: formatTime(new Date()),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // List of FAQs with predefined answers
  const faqs: FAQ[] = [
    {
      id: "faq1",
      question: "What is the best time to visit Ethiopia?",
      answer:
        "The best time to visit Ethiopia is during the dry season from October to March. This period offers pleasant temperatures and minimal rainfall, making it ideal for exploring historical sites and trekking in the mountains.",
    },
    {
      id: "faq2",
      question: "Do I need a visa to visit Ethiopia?",
      answer:
        "Yes, most visitors need a visa to enter Ethiopia. You can obtain an e-visa online before your trip through the official Ethiopian e-visa portal, or get a visa on arrival at Bole International Airport in Addis Ababa.",
    },
    {
      id: "faq3",
      question: "What are the must-see destinations in Ethiopia?",
      answer:
        "Ethiopia's top destinations include the rock-hewn churches of Lalibela, the ancient obelisks of Axum, the castles of Gondar, the Simien Mountains National Park, the Danakil Depression, and the tribal cultures of the Omo Valley.",
    },
    {
      id: "faq4",
      question: "Is it safe to travel in Ethiopia?",
      answer:
        "Ethiopia is generally safe for tourists, especially in major tourist destinations. However, like any destination, it's important to stay informed about current conditions, avoid border regions with conflict, and follow standard travel safety precautions.",
    },
    {
      id: "faq5",
      question: "What currency is used in Ethiopia?",
      answer:
        "The Ethiopian Birr (ETB) is the official currency. While major hotels and some restaurants in Addis Ababa accept credit cards, it's advisable to carry cash for most transactions, especially when traveling outside the capital.",
    },
  ];

  // Auto-responses for the AI
  const autoResponses = [
    "Thank you for your message! Our team will help you plan the perfect Ethiopian adventure.",
    "Ethiopia has a rich cultural heritage with over 80 different ethnic groups, each with their own traditions and languages.",
    "Our most popular tour is the Historical Northern Route, which includes Lalibela and Axum.",
    "Yes, we can customize any tour package to meet your specific interests and needs.",
    "Ethiopia is known for its rich culture, ancient history, and stunning landscapes.",
  ];

  // Format time for message timestamps
  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowFAQs(false);

    // Simulate AI response after a short delay
    setTimeout(() => {
      // Get a random response from the array
      const randomResponse =
        autoResponses[Math.floor(Math.random() * autoResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  // Handle FAQ selection
  const handleFAQSelect = (question: string) => {
    // Add the selected question as a user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowFAQs(false);

    // Find the corresponding answer
    const selectedFAQ = faqs.find((faq) => faq.question === question);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          selectedFAQ?.answer ||
          "I'm sorry, I don't have information on that topic.",
        isUser: false,
        timestamp: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  // Toggle FAQ display
  const toggleFAQs = () => {
    setShowFAQs(!showFAQs);
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg z-50 p-0",
          isOpen && "bg-red-500 hover:bg-red-600"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}>
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageSquareMore style={{ height: 25, width: 25 }} />
        )}
      </Button>

      {/* Chat widget */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 sm:w-96 bg-background rounded-lg shadow-xl z-50 transition-all duration-300 flex flex-col",
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        style={{ height: isOpen ? "500px" : "0" }}>
        {/* Chat header */}
        <div className="bg-primary text-primary-foreground p-3 rounded-t-lg flex flow-row items-center justify-between">
          <div>
            <h3 className="font-medium">Mosaic Tours Chat</h3>
            <p className="text-xs opacity-90">
              Ask us anything about your trip
            </p>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="text-lg rounded-full">
            <X />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}

          {/* Show FAQs if toggled */}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="p-3 border-t">
          <div className="flex flex-col justify-center mb-2">
            {showFAQs && (
              <FAQOptions
                options={faqs.map((faq) => ({
                  id: faq.id,
                  question: faq.question,
                }))}
                onSelectFAQ={handleFAQSelect}
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFAQs}
              className="text-xs flex items-center justify-start gap-1 text-muted-foreground">
              <HelpCircle size={14} />
              {showFAQs ? "Hide FAQs" : "Show FAQs"}
            </Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={inputValue.trim() === ""}>
              <Send size={18} />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
