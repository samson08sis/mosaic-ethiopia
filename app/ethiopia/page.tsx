"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Info,
  Coffee,
  Music,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EthiopianPattern from "./components/EthiopianPattern";
import AttractionCard from "./components/AttractionCard";
import FestivalCard from "./components/FestivalCard";
import DishCard from "./components/DishCard";
import CTASection from "@/components/ethiopia/CTASection";

const badgeStyle = "h-5 w-5 mr-1";
const data = {
  iconBadges: [
    { label: "Birthplace of Coffee", icon: <Coffee className={badgeStyle} /> },
    { label: "13-Month Calendar", icon: <Calendar className={badgeStyle} /> },
    { label: "Unique Music & Dance", icon: <Music className={badgeStyle} /> },
    { label: "Distinctive Cuisine", icon: <Utensils className={badgeStyle} /> },
  ],

  facts: [
    {
      title: "Ethiopia's Unique Calendar",
      detail:
        "Ethiopia follows its own calendar system that is approximately 7-8 years behind the Gregorian calendar. It also has 13 months - 12 months of 30 days each and a 13th month of 5 or 6 days.",
    },
    {
      title: "The Origin of Coffee",
      detail:
        "Coffee was first discovered in Ethiopia when a goat herder named Kaldi noticed his goats becoming energetic after eating berries from a certain tree. Ethiopia still performs the traditional coffee ceremony as a sign of friendship and respect",
    },
    {
      title: "Lucy's Home",
      detail:
        'Ethiopia is where "Lucy" (Dinkinesh), one of the oldest and most complete hominid skeletons ever found, was discovered. Dating back 3.2 million years, she provides evidence that Ethiopia truly is the cradle of humanity.',
    },
  ],
};

export default function EthiopiaPage() {
  const [activeTab, setActiveTab] = useState("cultural");
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Data for different categories
  const culturalPlaces = [
    {
      id: 1,
      name: "Omo Valley",
      description:
        "Home to diverse indigenous tribes including the Mursi, Hamer, and Karo, each with unique cultural practices, body adornments, and traditions that have remained largely unchanged for centuries.",
      image: "/bg-42.jpg",
      location: "Southern Nations Region",
      tags: ["Tribal Culture", "Photography", "Indigenous"],
      wikiUrl: "https://en.wikipedia.org/wiki/Omo_Valley",
    },
    {
      id: 2,
      name: "Harar",
      description:
        "A walled city in eastern Ethiopia known for its colorful buildings, narrow alleyways, and unique tradition of feeding wild hyenas. It's considered the fourth holiest city in Islam with 82 mosques.",
      image: "/bg-55.jpg",
      location: "Harari Region",
      tags: ["Islamic Heritage", "Architecture", "Hyena Feeding"],
      wikiUrl: "https://en.wikipedia.org/wiki/Harar",
    },
    {
      id: 3,
      name: "Konso Cultural Landscape",
      description:
        "A UNESCO World Heritage site featuring stone-walled terraces and fortified settlements that showcase the Konso people's adaptive agricultural practices and social structure.",
      image: "/bg-56.jpg",
      location: "Southern Nations Region",
      tags: ["UNESCO Site", "Terraced Agriculture", "Traditional Villages"],
      wikiUrl: "https://en.wikipedia.org/wiki/Konso_Cultural_Landscape",
    },
  ];

  const castles = [
    {
      id: 1,
      name: "Fasil Ghebbi (Royal Enclosure)",
      description:
        "A UNESCO World Heritage site in Gondar featuring a collection of castles and palaces built in the 17th and 18th centuries. The complex showcases a unique architectural style that blends Portuguese, Indian, and Moorish influences.",
      image: "/bg-58.jpg",
      location: "Gondar, Amhara Region",
      tags: ["UNESCO Site", "Medieval Architecture", "Royal History"],
      wikiUrl: "https://en.wikipedia.org/wiki/Fasil_Ghebbi",
    },
    {
      id: 2,
      name: "Menelik's Palace",
      description:
        "Built by Emperor Menelik II in the late 19th century, this grand palace in Addis Ababa features European and traditional Ethiopian architectural elements and served as the imperial residence.",
      image: "/bg-57.jpg",
      location: "Addis Ababa",
      tags: ["Imperial History", "Colonial Architecture", "Museum"],
      wikiUrl: "https://en.wikipedia.org/wiki/Menelik_Palace",
    },
    {
      id: 3,
      name: "Yeha Palace and Temple",
      description:
        "Dating back to 700 BCE, this pre-Aksumite temple is one of Ethiopia's oldest standing structures. The impressive stone building demonstrates the advanced architectural knowledge of the ancient D'mt Kingdom.",
      image: "/bg-60.jpg",
      location: "Tigray Region",
      tags: ["Ancient History", "Pre-Aksumite", "Archaeological Site"],
      wikiUrl: "https://en.wikipedia.org/wiki/Yeha",
    },
  ];

  const religiousPlaces = [
    {
      id: 1,
      name: "Rock-Hewn Churches of Lalibela",
      description:
        "A UNESCO World Heritage site featuring 11 medieval monolithic churches carved from solid rock in the 12th-13th centuries. These remarkable structures are still active places of worship for Ethiopian Orthodox Christians.",
      image: "/lalibela-2.jpg",
      location: "Lalibela, Amhara Region",
      tags: ["UNESCO Site", "Orthodox Christianity", "Rock Architecture"],
      wikiUrl: "https://en.wikipedia.org/wiki/Rock-Hewn_Churches,_Lalibela",
    },
    {
      id: 2,
      name: "Debre Damo Monastery",
      description:
        "An ancient monastery accessible only by climbing a 15-meter rope up a sheer cliff. Founded in the 6th century, it houses one of Ethiopia's oldest existing churches and important religious manuscripts.",
      image: "/bg-62.jpg",
      location: "Tigray Region",
      tags: ["Monastery", "Ancient Manuscripts", "Religious History"],
      wikiUrl: "https://en.wikipedia.org/wiki/Debre_Damo",
    },
    {
      id: 3,
      name: "Holy Trinity Cathedral",
      description:
        "The highest-ranking Ethiopian Orthodox cathedral in Addis Ababa, known for its distinctive architecture and as the final resting place of Emperor Haile Selassie and other notable Ethiopians.",
      image: "/bg-61.jpg",
      location: "Addis Ababa",
      tags: ["Orthodox Cathedral", "Imperial Tombs", "Modern Architecture"],
      wikiUrl:
        "https://en.wikipedia.org/wiki/Holy_Trinity_Cathedral_(Addis_Ababa)",
    },
  ];

  const festivals = [
    {
      id: 1,
      name: "Timkat (Epiphany)",
      description:
        "Ethiopia's most colorful festival celebrating the baptism of Jesus in the Jordan River. Processions of tabots (replicas of the Ark of the Covenant) and ritual baptism in water are central to the celebrations.",
      image: "/bg-64.jpg",
      date: "January 19-20",
      location: "Nationwide (especially Gondar and Lalibela)",
      tags: ["Orthodox Christian", "Processions", "Water Ritual"],
      wikiUrl: "https://en.wikipedia.org/wiki/Timkat",
    },
    {
      id: 2,
      name: "Meskel (Finding of the True Cross)",
      description:
        "A festival commemorating the discovery of the True Cross by Queen Helena. Features the burning of the Damera (bonfire) in town squares across Ethiopia, with the most spectacular celebration in Addis Ababa.",
      image: "/bg-63.jpg",
      date: "September 27-28",
      location: "Nationwide (especially Addis Ababa)",
      tags: ["Orthodox Christian", "Bonfires", "Processions"],
      wikiUrl: "https://en.wikipedia.org/wiki/Meskel",
    },
    {
      id: 3,
      name: "Irreecha (Oromo Thanksgiving)",
      description:
        "The most important cultural and spiritual festival for the Oromo people, celebrating the end of the rainy season and giving thanks for harvests and blessings. Features colorful ceremonies at Lake Hora.",
      image: "bg-65.jpg",
      date: "Late September/Early October",
      location: "Bishoftu (Debre Zeit)",
      tags: ["Oromo Culture", "Thanksgiving", "Traditional Dress"],
      wikiUrl: "https://en.wikipedia.org/wiki/Irreechaa",
    },
  ];

  const ethiopianDishes = [
    {
      id: 1,
      name: "Injera",
      description:
        "A sourdough flatbread with a unique, slightly spongy texture. It's the foundation of Ethiopian cuisine, serving both as the plate and the utensil for most meals.",
      image:
        "https://images.unsplash.com/photo-1566918214014-a3b1dc72a7f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: ["Teff flour", "Water", "Fermentation starter"],
      significance:
        "Injera symbolizes community and sharing, as multiple people eat from the same plate, tearing pieces to scoop up stews and vegetables.",
    },
    {
      id: 2,
      name: "Doro Wat",
      description:
        "A spicy chicken stew considered Ethiopia's national dish. It's slow-cooked with berbere spice blend, onions, and clarified butter, often served with boiled eggs.",
      image:
        "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: [
        "Chicken",
        "Berbere spice",
        "Onions",
        "Niter kibbeh (spiced butter)",
        "Eggs",
      ],
      significance:
        "Traditionally served during festivals and special occasions, offering doro wat to guests is a sign of respect and hospitality.",
    },
    {
      id: 3,
      name: "Shiro",
      description:
        "A highly seasoned, pureed chickpea or broad bean stew. It's a staple in Ethiopian cuisine and is especially popular during fasting periods when meat is avoided.",
      image:
        "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: [
        "Chickpea flour",
        "Berbere spice",
        "Garlic",
        "Onions",
        "Tomatoes",
      ],
      significance:
        "Shiro is an essential dish during the numerous fasting days observed by Ethiopian Orthodox Christians.",
    },
    {
      id: 4,
      name: "Gomen Besiga",
      description:
        "A hearty dish of collard greens cooked with beef, spices, and niter kibbeh (Ethiopian spiced butter). The greens are finely chopped and slow-cooked to perfection.",
      image:
        "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: [
        "Collard greens",
        "Beef",
        "Niter kibbeh",
        "Garlic",
        "Onions",
        "Spices",
      ],
      significance:
        "This dish represents the Ethiopian tradition of combining vegetables and meat for a balanced meal.",
    },
    {
      id: 5,
      name: "Difo Dabo",
      description:
        "A large, round, slightly sweet bread baked in a clay pot. It's often prepared for special occasions and holidays, with a golden crust and soft interior.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: ["Wheat flour", "Honey", "Eggs", "Butter", "Spices"],
      significance:
        "Difo dabo is traditionally made for celebrations and religious holidays, often blessed before being shared among family and guests.",
    },
    {
      id: 6,
      name: "Kolo",
      description:
        "A popular Ethiopian snack made from roasted barley, chickpeas, and peanuts. It's seasoned with salt and sometimes spices, making it a perfect on-the-go energy food.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: ["Barley", "Chickpeas", "Peanuts", "Salt", "Spices"],
      significance:
        "Kolo is a traditional travel food and is often served to welcome guests alongside coffee during the Ethiopian coffee ceremony.",
    },
    {
      id: 7,
      name: "Kitfo",
      description:
        "A traditional dish of minced raw beef, marinated in mitmita (a spicy chili powder) and niter kibbeh. It can be served slightly warmed (leb leb) or fully cooked (yebesele).",
      image:
        "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: [
        "Raw beef",
        "Mitmita spice",
        "Niter kibbeh",
        "Kocho (false banana bread)",
      ],
      significance:
        "Kitfo is a delicacy in Ethiopian cuisine and is often prepared during special celebrations and festivals.",
    },
    {
      id: 8,
      name: "Tibs",
      description:
        "Sautéed meat (usually beef or lamb) cooked with vegetables and aromatic spices. It can be prepared mild or spicy and is often served sizzling hot.",
      image:
        "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      ingredients: [
        "Beef or lamb",
        "Onions",
        "Peppers",
        "Rosemary",
        "Berbere spice",
      ],
      significance:
        "Tibs is often prepared to honor guests or celebrate special occasions, symbolizing prosperity and generosity.",
    },
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "cultural":
        return culturalPlaces;
      case "castles":
        return castles;
      case "religious":
        return religiousPlaces;
      case "festivals":
        return festivals;
      case "dishes":
        return ethiopianDishes;
      default:
        return culturalPlaces;
    }
  };

  // Get current icon based on active tab
  const getCurrentIcon = () => {
    switch (activeTab) {
      case "cultural":
        return (
          <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        );
      case "castles":
        return (
          <Info className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        );
      case "religious":
        return (
          <Info className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        );
      case "festivals":
        return (
          <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        );
      case "dishes":
        return (
          <Utensils className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        );
      default:
        return (
          <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        );
    }
  };

  // Get current title based on active tab
  const getCurrentTitle = () => {
    switch (activeTab) {
      case "cultural":
        return "Cultural Places";
      case "castles":
        return "Castles & Palaces";
      case "religious":
        return "Religious Sites";
      case "festivals":
        return "Festivals & Celebrations";
      case "dishes":
        return "Ethiopian Dishes";
      default:
        return "Cultural Places";
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] dark:bg-gray-900">
      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')",
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 font-arizonia">
            Discover Ethiopia
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl">
            Land of Origins - Where Ancient History Meets Vibrant Culture
          </motion.p>
        </div>

        {/* Ethiopian Pattern Divider */}
        <div>
          <EthiopianPattern />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-arizonia">
            Ethiopia's Cultural Treasures
          </h2>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-12 shadow-md">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                The Cradle of Humanity
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ethiopia, often called the "Cradle of Humanity," is home to some
                of the oldest evidence of human existence. With a history
                spanning over 3,000 years, it's the only African country that
                was never colonized, preserving its rich cultural heritage and
                unique traditions.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                From ancient rock-hewn churches and medieval castles to vibrant
                tribal cultures and colorful festivals, Ethiopia offers visitors
                an authentic glimpse into Africa's most diverse historical and
                cultural landscape.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {data.iconBadges.map((item) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex items-center text-primary-600 dark:text-primary-400">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1602517150353-4eb9d5d0bf5b"
                alt="Ethiopian cultural scene"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Category Tabs - now inside Introduction */}
          <div className="mt-10 overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap justify-center gap-2">
              {["cultural", "castles", "religious", "festivals", "dishes"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-primary-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}>
                    {tab === "cultural" && "Cultural Places"}
                    {tab === "castles" && "Castles & Palaces"}
                    {tab === "religious" && "Religious Sites"}
                    {tab === "festivals" && "Festivals & Celebrations"}
                    {tab === "dishes" && "Ethiopian Dishes"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Category Title */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
            {getCurrentIcon()}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getCurrentTitle()}
          </h3>
        </div>

        {/* Attractions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-1 ${
            activeTab === "festivals"
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          } gap-8`}>
          {activeTab === "festivals"
            ? festivals.map((festival) => (
                <motion.div key={festival.id} variants={itemVariants}>
                  <FestivalCard festival={festival} />
                </motion.div>
              ))
            : activeTab === "dishes"
            ? ethiopianDishes.map((dish) => (
                <motion.div key={dish.id} variants={itemVariants}>
                  <DishCard dish={dish} />
                </motion.div>
              ))
            : getCurrentData().map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <AttractionCard item={item} />
                </motion.div>
              ))}
        </motion.div>

        {/* Did You Know Section */}
        <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 border-l-4 border-primary-600 dark:border-primary-400">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Did You Know?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.facts.map((fact) => (
              <div
                key={crypto.randomUUID()}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {fact.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection />
      </div>

      {/* Ethiopian Pattern Footer */}
      {/* <EthiopianPattern /> */}
    </div>
  );
}
