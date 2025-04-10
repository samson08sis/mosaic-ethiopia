"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuickSuggestions from "../QuickSuggestions";

// Types for our chat messages
type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
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
      "What makes Axum historically significant?",
      "Are there beaches in Ethiopia?",
      "What wildlife can I see in Ethiopia's national parks?",
      "Tell me about the Blue Nile Falls",
      "What are the best cities to visit in Ethiopia?",
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
      "Do I need a visa for Ethiopia?",
      "What's the best way to get around Ethiopia?",
      "Can you arrange airport transfers?",
      "What should I pack for an Ethiopia trip?",
      "Are there any cultural customs I should know?",
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
      "Can I attend a traditional Ethiopian wedding?",
      "What music and dance traditions exist in Ethiopia?",
      "How do Ethiopians celebrate holidays?",
      "What's the significance of Ethiopian Orthodox Christianity?",
      "Can I learn Amharic phrases before my trip?",
    ],
  },
  {
    id: "accommodation",
    name: "Accommodation & Food",
    questions: [
      "What types of accommodation are available?",
      "Can you recommend eco-friendly lodges?",
      "What are the best hotels in Addis Ababa?",
      "Is vegetarian food available in Ethiopia?",
      "What Ethiopian dishes should I try?",
      "Are international food options available?",
      "What are traditional Ethiopian breakfasts like?",
      "Can you arrange homestays with local families?",
      "What are the camping options in national parks?",
      "Are there luxury accommodation options?",
    ],
  },
  {
    id: "adventure",
    name: "Adventure Activities",
    questions: [
      "What trekking routes do you recommend?",
      "Can I climb Ras Dashen?",
      "Are there cycling tours available?",
      "What wildlife safaris are available?",
      "Can I visit the Erta Ale volcano?",
      "Are there hot air balloon rides in Ethiopia?",
      "What water activities are available?",
      "Can I go birdwatching in Ethiopia?",
      "Are there photography tours available?",
      "What unique experiences can I have in Ethiopia?",
    ],
  },
  {
    id: "history",
    name: "History & Heritage",
    questions: [
      "What are Ethiopia's most important historical sites?",
      "Tell me about the Ark of the Covenant legend",
      "What was the significance of the Aksumite Kingdom?",
      "Can I see Lucy the hominid skeleton?",
      "What role did Ethiopia play in African history?",
      "Tell me about Ethiopian emperors like Haile Selassie",
      "What are the origins of the Rastafarian connection?",
      "How did Ethiopia resist colonization?",
      "What ancient artifacts can I see in Ethiopia?",
      "Tell me about Gondar's castle complex",
    ],
  },
  {
    id: "practical",
    name: "Practical Information",
    questions: [
      "What's the currency in Ethiopia?",
      "Can I use credit cards in Ethiopia?",
      "Is WiFi widely available?",
      "What's the time zone in Ethiopia?",
      "What's the voltage and plug type used?",
      "How should I dress in Ethiopia?",
      "Is tipping customary in Ethiopia?",
      "What's the emergency number in Ethiopia?",
      "Are ATMs readily available?",
      "What's the etiquette for photography?",
    ],
  },
  {
    id: "website",
    name: "Website & Navigation",
    questions: [
      "How do I search for tours on your website?",
      "Can I filter tours by duration or price?",
      "Where can I find customer reviews?",
      "How do I contact customer support?",
      "Is there a mobile app for your services?",
      "How do I change the language on the website?",
      "Where can I find travel tips on your site?",
      "How do I check availability for a specific date?",
      "Can I compare different tour packages?",
      "Do you have a blog or travel guides section?",
    ],
  },
  {
    id: "account",
    name: "Account & Bookings",
    questions: [
      "How do I create an account?",
      "Can I book without creating an account?",
      "How do I reset my password?",
      "Where can I see my booking history?",
      "How do I modify or cancel a booking?",
      "Is my payment information secure?",
      "Can I save tours to a wishlist?",
      "How do I update my personal details?",
      "Do you offer group booking discounts?",
      "Can I book now and pay later?",
    ],
  },
  {
    id: "payments",
    name: "Payments & Pricing",
    questions: [
      "What payment methods do you accept?",
      "Are there any hidden fees?",
      "Can I pay in installments?",
      "Do you offer refunds if I cancel?",
      "Is travel insurance included?",
      "Are there discounts for early bookings?",
      "Do children get discounted rates?",
      "Can I pay in a different currency?",
      "What happens if the price changes after I book?",
      "Are there any seasonal promotions?",
    ],
  },
  {
    id: "support",
    name: "Customer Support",
    questions: [
      "How do I contact your support team?",
      "What are your customer service hours?",
      "Can I get help via WhatsApp or chat?",
      "How quickly do you respond to emails?",
      "Do you have a FAQ section for quick answers?",
      "Can I speak to a travel consultant directly?",
      "Do you offer assistance in multiple languages?",
      "What if I have an emergency during my trip?",
      "Can I request a callback from support?",
      "Where can I leave feedback about my experience?",
    ],
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "ሰላም! Hello! I'm your Ethiopian travel assistant. How can I help you plan your journey to Ethiopia?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      setExpandedCategories({});
    }
  };

  const toggleFaq = () => {
    setShowFaq(!showFaq);
    if (!showFaq) {
      setExpandedCategories({}); // Collapse all categories when opening FAQ
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = (messageText = inputValue) => {
    if (messageText.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowFaq(false); // Close FAQ when sending a message

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateResponse(messageText);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleFaqClick = (question: string) => {
    handleSendMessage(question);
  };

  // Function to generate responses based on user input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Check for keywords and return appropriate responses
    if (input.includes("lalibela") || input.includes("churches")) {
      return "Lalibela is famous for its 11 rock-hewn churches carved from solid red volcanic rock in the 12th-13th centuries. These UNESCO World Heritage sites are still active places of worship. The best time to visit is during Ethiopian Orthodox celebrations like Timkat (January) or Genna (Ethiopian Christmas). Our Ethiopian Historical Route package includes 2 days in Lalibela.";
    } else if (
      input.includes("danakil") ||
      input.includes("volcano") ||
      input.includes("hottest")
    ) {
      return "The Danakil Depression is one of the hottest places on Earth with otherworldly landscapes including colorful sulfur springs, salt flats, and the active Erta Ale volcano with its lava lake. It's best visited between November and March. Our 6-day Danakil Depression Expedition takes you safely through this extreme but fascinating environment.";
    } else if (
      input.includes("simien") ||
      input.includes("mountains") ||
      input.includes("trekking")
    ) {
      return "The Simien Mountains offer spectacular trekking opportunities with dramatic escarpments and are home to endemic wildlife like the Gelada baboon (bleeding heart monkey) and Walia ibex. The best hiking season is from October to March. Our Ethiopian Nature & Wildlife package includes a comprehensive Simien Mountains experience with options for 2-5 day treks.";
    } else if (
      input.includes("omo") ||
      input.includes("tribes") ||
      input.includes("cultural")
    ) {
      return "The Omo Valley is home to diverse indigenous tribes including the Mursi, Hamer, Karo, and Daasanach, each with unique cultural practices. Our 9-day Omo Valley Cultural Immersion tour provides respectful opportunities to learn about these communities while supporting local initiatives. The experience includes visiting markets, witnessing ceremonies (when available), and learning about traditional lifestyles.";
    } else if (input.includes("addis") || input.includes("addis ababa")) {
      return "Addis Ababa, Ethiopia's capital, is worth at least 1-2 days of exploration. Visit the National Museum to see Lucy (3.2 million-year-old hominid fossil), Holy Trinity Cathedral, Merkato (Africa's largest open-air market), and enjoy the city's excellent restaurants. Addis is also the gateway to Ethiopia at 2,355m elevation, so it's a good place to acclimatize before heading to higher altitudes.";
    } else if (input.includes("coffee") || input.includes("ceremony")) {
      return "Ethiopia is the birthplace of coffee! The traditional coffee ceremony is a central part of Ethiopian social and cultural life. It involves roasting green beans over hot coals, grinding them with a mortar and pestle, and brewing in a special clay pot called a jebena. The coffee is served in small cups with sugar or salt, often alongside popcorn. Our Ethiopian Coffee Trail tour takes you to the origins of coffee in Kaffa, visits farms in Yirgacheffe, and includes multiple traditional coffee ceremonies.";
    } else if (
      input.includes("festival") ||
      input.includes("timkat") ||
      input.includes("meskel")
    ) {
      return "Ethiopian festivals are vibrant cultural experiences. Timkat (January) celebrates Epiphany with colorful processions and ritual baptism. Meskel (September) commemorates the finding of the True Cross with massive bonfires. Genna (Ethiopian Christmas, January 7) and Fasika (Ethiopian Easter) are also significant. Our Ethiopian Festivals package is timed around these major celebrations for an unforgettable experience.";
    } else if (
      input.includes("cost") ||
      input.includes("price") ||
      input.includes("how much")
    ) {
      return "Our Ethiopian tour packages range from $1,299 to $1,899 per person, depending on the itinerary, duration, and inclusions. This typically includes accommodation, most meals, domestic transportation, guides, and entrance fees. International flights, visa fees, and personal expenses are not included. All packages can be customized to fit your preferences and budget.";
    } else if (
      input.includes("best time") ||
      input.includes("when to visit") ||
      input.includes("season")
    ) {
      return "The best time to visit Ethiopia is during the dry season from October to March. The northern historical route is accessible year-round, while some areas like the Danakil Depression are best visited in winter months (November-February). The southern regions including Omo Valley are accessible year-round but some roads may be difficult during the rainy season (June-September).";
    } else if (
      input.includes("food") ||
      input.includes("cuisine") ||
      input.includes("injera")
    ) {
      return "Ethiopian cuisine is delicious and unique! The staple is injera, a sourdough flatbread with a slightly tangy taste, served with various wats (stews) and tibs (sautéed meat). Don't miss doro wat (spicy chicken stew), shiro (chickpea puree), and kitfo (minced raw beef). Ethiopia has many fasting days when only vegetarian dishes are served, making it excellent for vegetarians. Coffee is also an essential part of Ethiopian culture.";
    } else if (
      input.includes("days") ||
      input.includes("how long") ||
      input.includes("spend")
    ) {
      return "For a comprehensive Ethiopian experience, we recommend 10-14 days. This allows you to visit the northern historical route (Lalibela, Gondar, Axum), experience natural wonders like the Simien Mountains, and possibly include the Danakil Depression or southern cultural areas. If you have limited time, a focused 7-day trip covering just the northern highlights can still be rewarding.";
    } else if (
      input.includes("safe") ||
      input.includes("safety") ||
      input.includes("danger")
    ) {
      return "Ethiopia is generally safe for tourists, especially in the main tourist areas. Like any destination, it's important to take standard precautions. Political situations can change, so we always monitor conditions and adjust itineraries if needed. Our guides are experienced in ensuring visitor safety, and we provide pre-trip safety information. We recommend checking your government's travel advisories before booking.";
    } else if (
      input.includes("vaccination") ||
      input.includes("vaccine") ||
      input.includes("health")
    ) {
      return "For Ethiopia, recommended vaccinations typically include Yellow Fever (required for entry), Hepatitis A and B, Typhoid, and routine vaccines. Malaria prophylaxis is recommended for some regions. It's best to consult with a travel health specialist 4-8 weeks before your trip for personalized advice. We also recommend bringing a basic medical kit and purchasing comprehensive travel insurance.";
    } else if (
      input.includes("language") ||
      input.includes("speak") ||
      input.includes("amharic")
    ) {
      return "Amharic is Ethiopia's official language, but over 80 languages are spoken throughout the country. English is commonly used in tourism, and our guides are fluent in English. Learning a few basic Amharic phrases like 'Selam' (hello) and 'Ameseginalehu' (thank you) is appreciated by locals. In the Omo Valley, local guides help translate tribal languages.";
    } else if (
      input.includes("souvenir") ||
      input.includes("buy") ||
      input.includes("shopping")
    ) {
      return "Ethiopia offers wonderful souvenirs including traditional coffee sets, handwoven scarves and textiles, Orthodox icons and crosses, traditional baskets (mesob), leather goods, and of course, Ethiopian coffee beans. Addis Ababa has excellent shopping at Merkato and Shiromeda Market. We can arrange shopping excursions with guides who can help with fair pricing and authentic items.";
    } else if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      return "ሰላም (Selam)! Hello! I'm your Ethiopian travel assistant. I can help with information about destinations, tour packages, best times to visit, and more. What would you like to know about traveling to Ethiopia?";
    } else if (input.includes("thank")) {
      return "አመሰግናለሁ (Ameseginalehu) - You're welcome! If you have any more questions about traveling to Ethiopia, feel free to ask. We're here to help you plan an unforgettable journey!";
    } else {
      return "That's a great question about Ethiopia! Our team specializes in customized Ethiopian experiences. Would you like me to connect you with a travel specialist who can provide more detailed information about this?";
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-red-600 rotate-90" : "bg-blue-500 hover:bg-blue-600"
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
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Chat Header */}
            <div className="bg-primary-600 text-white p-4 flex items-center relative">
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

            {/* //Ethiopian pattern divider
            <div className="h-2 w-full bg-[url('/patterns/ethiopian-pattern.png')] bg-repeat-x"></div> */}

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
                      {/* <div className="space-y-4">
                        {faqCategories.map((category) => (
                          <div
                            key={category.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-100 dark:bg-gray-800 p-3 font-medium text-gray-900 dark:text-white flex items-center">
                              <Info className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
                              {category.name}
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                              {category.questions.map((question, idx) => (
                                <button
                                  key={idx}
                                  className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm"
                                  onClick={() => handleFaqClick(question)}>
                                  <span>{question}</span>
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div> */}
                      <div className="space-y-3">
                        {faqCategories.map((category) => (
                          <div
                            key={category.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            {/* Category Header - Now Clickable */}
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
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}>
                    {/* {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex-shrink-0 mr-2 flex items-center justify-center text-white text-xs font-bold">
                        ET
                      </div>
                    )} */}
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-br-none"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow border border-gray-100 dark:border-gray-600 rounded-bl-none"
                      }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
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
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
