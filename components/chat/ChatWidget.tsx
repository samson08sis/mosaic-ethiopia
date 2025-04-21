"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickSuggestions from "./QuickSuggestions";
import CopyButton from "../ui/CopyButton";
import InfoCard from "../ui/InfoCard";
// Types for our chat messages
type Message = {
  id: string;
  content: string;
  sender: "user" | "bot" | "bot-error" | "system";
  type: "chat" | "info";
  timestamp: Date;
};
type History = {
  role: "user" | "assistant";
  content: string;
};

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
      id: "start-date",
      content: new Date().toDateString(),
      sender: "system",
      type: "info",
      timestamp: new Date(),
    },
    {
      id: "welcome",
      content:
        "ሰላም! Hello! I'm your Mosaic travel assistant. How can I help you plan your journey to Ethiopia?",
      sender: "bot",
      type: "chat",
      timestamp: new Date(),
    },
  ]);
  const [history, setHistory] = useState<History[]>([]);
  const [lastDate, setLastDate] = useState<Date>(
    messages[messages.length - 1].timestamp
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [showNewThreadConfirmation, setShowNewThreadConfirmation] =
    useState(false);
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

  const generateResponse = async (input = inputValue) => {
    if (!input.trim()) return;

    setIsTyping(true);
    isDifferentDate();
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: input,
        sender: "user",
        type: "chat",
        timestamp: new Date(),
      },
    ]);
    try {
      const response = await axios.post("http://localhost:3000/api/ask-groq", {
        prompt: input,
        history,
      });
      console.log(response.data?.answer);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: response.data.answer,
          sender: "bot",
          type: "chat",
          timestamp: new Date(),
        },
      ]);

      setHistory((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: response.data.answer },
      ]);

      setInputValue(""); // Clear input after sending
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content:
            axios.isAxiosError(error) && error.response?.data?.error
              ? error.response.data.error
              : "Couldn't process your request. Please try again or seek support on [support@mosaicethiopia.com](mailto:support@mosaicethiopia.com).",
          sender: "bot-error",
          type: "chat",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (messageText.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: messageText,
      sender: "user",
      type: "chat",
      timestamp: new Date(),
    };

    setInputValue("");
    setShowFaq(false); // Close FAQ when sending a message

    await generateResponse(messageText);
  };

  const handleFaqClick = async (question: string) => {
    await handleSendMessage(question);
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
          id: crypto.randomUUID(),
          content: today.toDateString(),
          sender: "system",
          type: "info",
          timestamp: new Date(),
        },
      ]);
    }
    return true;
  };

  const handleStartNewThread = () => {
    setShowNewThreadConfirmation(true);
  };

  const confirmStartNewThread = () => {
    setHistory([]);

    // Add a system message indicating a new thread
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: "--- New thread started ---",
        sender: "system",
        type: "info",
        timestamp: new Date(),
      },
    ]);

    // Close the confirmation dialog
    setShowNewThreadConfirmation(false);
  };

  // Function to generate responses based on user input
  // const generateResponse = (userInput: string): string => {
  //   const input = userInput.toLowerCase();

  //   // Check for keywords and return appropriate responses
  //   if (input.includes("lalibela") || input.includes("churches")) {
  //     return "Lalibela is famous for its 11 rock-hewn churches carved from solid red volcanic rock in the 12th-13th centuries. These UNESCO World Heritage sites are still active places of worship. The best time to visit is during Ethiopian Orthodox celebrations like Timkat (January) or Genna (Ethiopian Christmas). Our Ethiopian Historical Route package includes 2 days in Lalibela.";
  //   } else if (
  //     input.includes("danakil") ||
  //     input.includes("volcano") ||
  //     input.includes("hottest")
  //   ) {
  //     return "The Danakil Depression is one of the hottest places on Earth with otherworldly landscapes including colorful sulfur springs, salt flats, and the active Erta Ale volcano with its lava lake. It's best visited between November and March. Our 6-day Danakil Depression Expedition takes you safely through this extreme but fascinating environment.";
  //   } else if (
  //     input.includes("simien") ||
  //     input.includes("mountains") ||
  //     input.includes("trekking")
  //   ) {
  //     return "The Simien Mountains offer spectacular trekking opportunities with dramatic escarpments and are home to endemic wildlife like the Gelada baboon (bleeding heart monkey) and Walia ibex. The best hiking season is from October to March. Our Ethiopian Nature & Wildlife package includes a comprehensive Simien Mountains experience with options for 2-5 day treks.";
  //   } else if (
  //     input.includes("omo") ||
  //     input.includes("tribes") ||
  //     input.includes("cultural")
  //   ) {
  //     return "The Omo Valley is home to diverse indigenous tribes including the Mursi, Hamer, Karo, and Daasanach, each with unique cultural practices. Our 9-day Omo Valley Cultural Immersion tour provides respectful opportunities to learn about these communities while supporting local initiatives. The experience includes visiting markets, witnessing ceremonies (when available), and learning about traditional lifestyles.";
  //   } else if (input.includes("addis") || input.includes("addis ababa")) {
  //     return "Addis Ababa, Ethiopia's capital, is worth at least 1-2 days of exploration. Visit the National Museum to see Lucy (3.2 million-year-old hominid fossil), Holy Trinity Cathedral, Merkato (Africa's largest open-air market), and enjoy the city's excellent restaurants. Addis is also the gateway to Ethiopia at 2,355m elevation, so it's a good place to acclimatize before heading to higher altitudes.";
  //   } else if (input.includes("coffee") || input.includes("ceremony")) {
  //     return "Ethiopia is the birthplace of coffee! The traditional coffee ceremony is a central part of Ethiopian social and cultural life. It involves roasting green beans over hot coals, grinding them with a mortar and pestle, and brewing in a special clay pot called a jebena. The coffee is served in small cups with sugar or salt, often alongside popcorn. Our Ethiopian Coffee Trail tour takes you to the origins of coffee in Kaffa, visits farms in Yirgacheffe, and includes multiple traditional coffee ceremonies.";
  //   } else if (
  //     input.includes("festival") ||
  //     input.includes("timkat") ||
  //     input.includes("meskel")
  //   ) {
  //     return "Ethiopian festivals are vibrant cultural experiences. Timkat (January) celebrates Epiphany with colorful processions and ritual baptism. Meskel (September) commemorates the finding of the True Cross with massive bonfires. Genna (Ethiopian Christmas, January 7) and Fasika (Ethiopian Easter) are also significant. Our Ethiopian Festivals package is timed around these major celebrations for an unforgettable experience.";
  //   } else if (
  //     input.includes("cost") ||
  //     input.includes("price") ||
  //     input.includes("how much")
  //   ) {
  //     return "Our Ethiopian tour packages range from $1,299 to $1,899 per person, depending on the itinerary, duration, and inclusions. This typically includes accommodation, most meals, domestic transportation, guides, and entrance fees. International flights, visa fees, and personal expenses are not included. All packages can be customized to fit your preferences and budget.";
  //   } else if (
  //     input.includes("best time") ||
  //     input.includes("when to visit") ||
  //     input.includes("season")
  //   ) {
  //     return "The best time to visit Ethiopia is during the dry season from October to March. The northern historical route is accessible year-round, while some areas like the Danakil Depression are best visited in winter months (November-February). The southern regions including Omo Valley are accessible year-round but some roads may be difficult during the rainy season (June-September).";
  //   } else if (
  //     input.includes("food") ||
  //     input.includes("cuisine") ||
  //     input.includes("injera")
  //   ) {
  //     return "Ethiopian cuisine is delicious and unique! The staple is injera, a sourdough flatbread with a slightly tangy taste, served with various wats (stews) and tibs (sautéed meat). Don't miss doro wat (spicy chicken stew), shiro (chickpea puree), and kitfo (minced raw beef). Ethiopia has many fasting days when only vegetarian dishes are served, making it excellent for vegetarians. Coffee is also an essential part of Ethiopian culture.";
  //   } else if (
  //     input.includes("days") ||
  //     input.includes("how long") ||
  //     input.includes("spend")
  //   ) {
  //     return "For a comprehensive Ethiopian experience, we recommend 10-14 days. This allows you to visit the northern historical route (Lalibela, Gondar, Axum), experience natural wonders like the Simien Mountains, and possibly include the Danakil Depression or southern cultural areas. If you have limited time, a focused 7-day trip covering just the northern highlights can still be rewarding.";
  //   } else if (
  //     input.includes("safe") ||
  //     input.includes("safety") ||
  //     input.includes("danger")
  //   ) {
  //     return "Ethiopia is generally safe for tourists, especially in the main tourist areas. Like any destination, it's important to take standard precautions. Political situations can change, so we always monitor conditions and adjust itineraries if needed. Our guides are experienced in ensuring visitor safety, and we provide pre-trip safety information. We recommend checking your government's travel advisories before booking.";
  //   } else if (
  //     input.includes("vaccination") ||
  //     input.includes("vaccine") ||
  //     input.includes("health")
  //   ) {
  //     return "For Ethiopia, recommended vaccinations typically include Yellow Fever (required for entry), Hepatitis A and B, Typhoid, and routine vaccines. Malaria prophylaxis is recommended for some regions. It's best to consult with a travel health specialist 4-8 weeks before your trip for personalized advice. We also recommend bringing a basic medical kit and purchasing comprehensive travel insurance.";
  //   } else if (
  //     input.includes("language") ||
  //     input.includes("speak") ||
  //     input.includes("amharic")
  //   ) {
  //     return "Amharic is Ethiopia's official language, but over 80 languages are spoken throughout the country. English is commonly used in tourism, and our guides are fluent in English. Learning a few basic Amharic phrases like 'Selam' (hello) and 'Ameseginalehu' (thank you) is appreciated by locals. In the Omo Valley, local guides help translate tribal languages.";
  //   } else if (
  //     input.includes("souvenir") ||
  //     input.includes("buy") ||
  //     input.includes("shopping")
  //   ) {
  //     return "Ethiopia offers wonderful souvenirs including traditional coffee sets, handwoven scarves and textiles, Orthodox icons and crosses, traditional baskets (mesob), leather goods, and of course, Ethiopian coffee beans. Addis Ababa has excellent shopping at Merkato and Shiromeda Market. We can arrange shopping excursions with guides who can help with fair pricing and authentic items.";
  //   } else if (
  //     input.includes("hello") ||
  //     input.includes("hi") ||
  //     input.includes("hey")
  //   ) {
  //     return "ሰላም (Selam)! Hello! I'm your Ethiopian travel assistant. I can help with information about destinations, tour packages, best times to visit, and more. What would you like to know about traveling to Ethiopia?";
  //   } else if (input.includes("thank")) {
  //     return "አመሰግናለሁ (Ameseginalehu) - You're welcome! If you have any more questions about traveling to Ethiopia, feel free to ask. We're here to help you plan an unforgettable journey!";
  //   } else {
  //     return "That's a great question about Ethiopia! Our team specializes in customized Ethiopian experiences. Would you like me to connect you with a travel specialist who can provide more detailed information about this?";
  //   }
  // };

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
                <button onClick={scrollToEnd}>
                  <MessageSquare className="h-5 w-5" />
                </button>
              </div>
              <div>
                <h3 className="font-bold">Mosaic Travel Guide</h3>
                <p className="text-xs opacity-80">
                  ጥያቄዎን ይጠይቁ • Ask me anything
                </p>
              </div>

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
                {messages.map((message) => (
                  <div
                    key={crypto.randomUUID()}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : message.sender === "bot"
                        ? "justify-start"
                        : "justify-center text-center italic"
                    }`}>
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-br-none"
                          : message.sender === "bot"
                          ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow border border-gray-100 dark:border-gray-600 rounded-bl-none"
                          : message.sender === "bot-error"
                          ? "text-red-400"
                          : ""
                      }`}>
                      {message.sender === "bot" ||
                      message.sender === "bot-error" ? (
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-xl font-bold mt-2 mb-1"
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
                              <ul
                                className="list-disc pl-5 my-1 text-sm"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal pl-5 my-1 text-sm"
                                {...props}
                              />
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
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      {message.sender !== "system" &&
                        message.sender !== "bot-error" && (
                          <div className="flex flex-row space-x-4">
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <CopyButton textToCopy={message.content} />
                          </div>
                        )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="mb-4 flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs font-bold">
                      ET
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow border border-gray-100 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "600ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
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
              {showNewThreadConfirmation && (
                <InfoCard
                  content="This will start a new chat thread. Your current conversation will remain visible, but a new thread will be started."
                  title="Start a New Thread?"
                  links={[
                    {
                      text: "Cancel",
                      action: () => setShowNewThreadConfirmation(false),
                    },
                    {
                      text: "Start New Thread?",
                      action: confirmStartNewThread,
                    },
                  ]}
                  onClick={() => console.log("this")}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
