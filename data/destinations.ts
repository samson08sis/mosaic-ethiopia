import { Destination } from "@/types/destinations/types";

const destinations: Destination[] = [
  {
    id: "lalibela",
    slug: "lalibela",
    name: "Lalibela, Ethiopia",
    image: "/lalibela-bete-giorgis.jpg",
    gallery: ["/bg-49.jpg", "/bg-55.jpg", "/bg-66.jpg"],
    city: "Lalibela",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13515.319271237353!2d39.036397878513796!3d12.03199609691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16413eee814f2d03%3A0xf27414e782ae4b62!2sLalibela%2C%20Ethiopia!5e1!3m2!1sen!2snl!4v1759015677969!5m2!1sen!2snl",
    region: "Northern Ethiopia, Amhara Region",
    description:
      "Home to 11 medieval monolithic rock-hewn churches, Lalibela is Ethiopia's Jerusalem and a place of pilgrimage for Orthodox Christians.",
    rating: 4.9,
    reviews: 245,
    activities: ["Cultural", "Historical", "Religious"],
    bestTimeToVisit: "October to March",
    highlights: [
      "Rock-hewn churches",
      "Bete Giyorgis (Church of St. George)",
      "Ethiopian Orthodox ceremonies",
      "Traditional village life",
    ],
    thingsToDo: [
      "Tour the 11 monolithic churches",
      "Witness religious ceremonies",
      "Hike in the surrounding mountains",
      "Experience local cuisine",
    ],
    historicalImportance:
      "Built in the 12th-13th centuries, Lalibela was meant to be a 'New Jerusalem' after Muslim conquests halted Christian pilgrimages to the Holy Land.",
    culturalSignificance:
      "One of the holiest sites in Ethiopian Orthodox Christianity and a major pilgrimage destination.",
  },
  {
    id: "simien-mountains",
    slug: "simien-mountains",
    name: "Simien Mountains, Ethiopia",
    image: "/bg-2.jpg",
    gallery: ["bg-73.jpg", "bg-32.jpg", "bg-33.jpg"],
    description:
      "A UNESCO World Heritage site with dramatic mountain scenery, deep valleys, and rare wildlife including the Gelada baboon and Walia ibex.",
    rating: 4.8,
    reviews: 187,
    city: "Gondar",
    activities: ["Trekking", "Wildlife", "Nature"],
    region: "Northern Ethiopia, Amhara Region",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26896.341363599993!2d38.25681172933012!3d13.301672155594398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1669c28cabf2d5ed%3A0xc65f3aec5f823be3!2sSimien%20Mountains!5e1!3m2!1sen!2snl!4v1759020284788!5m2!1sen!2snl",
    bestTimeToVisit: "October to March",
    highlights: [
      "Dramatic escarpments and peaks",
      "Endemic wildlife species",
      "Spectacular viewpoints",
      "Traditional villages",
    ],
    thingsToDo: [
      "Multi-day trekking expeditions",
      "Wildlife spotting (Gelada baboons, Ethiopian wolves)",
      "Photography at Jinbar Waterfall",
      "Visit local communities",
    ],
    naturalFeatures:
      "The park features jagged mountain peaks, deep valleys, and sharp precipices dropping some 1,500m.",
  },
  {
    id: "danakil",
    slug: "danakil",
    name: "Danakil Depression, Ethiopia",
    image: "/bg-53.jpg",
    gallery: ["/afar-1.jpg", "/afar-2.jpg", "afar-danakil.jpg"],
    mapEmbed: "",
    description:
      "One of the hottest places on Earth with otherworldly landscapes featuring colorful sulfur springs, salt lakes, and active volcanoes.",
    rating: 4.7,
    reviews: 156,
    city: "Afar",
    activities: ["Adventure", "Geological", "Photography"],
    region: "Northeastern Ethiopia, Afar Region",
    bestTimeToVisit: "November to March",
    highlights: [
      "Dallol sulfur springs",
      "Erta Ale active volcano",
      "Salt flats and caravans",
      "Lake Asale",
    ],
    thingsToDo: [
      "Hike to Erta Ale volcano crater",
      "Photograph the colorful mineral formations at Dallol",
      "Witness traditional salt mining",
      "Camp under the stars",
    ],
    naturalFeatures:
      "The Danakil Depression sits at 410 feet below sea level and features some of the most extreme environments on Earth.",
  },
  {
    id: "gondar",
    slug: "gondar",
    name: "Gondar",
    image: "/bg-54.jpg",
    gallery: ["/afar-1.jpg", "/afar-2.jpg", "afar-danakil.jpg"],
    mapEmbed: "",
    description:
      "Known as the 'Camelot of Africa' for its medieval castles and imperial compound, Gondar was Ethiopia's royal capital in the 17th century.",
    rating: 4.6,
    reviews: 132,
    city: "Gondar",
    activities: ["Historical", "Cultural", "Architecture"],
    region: "Northern Ethiopia, Amhara Region",
    bestTimeToVisit: "October to March",
    highlights: [
      "Fasil Ghebbi (Royal Enclosure)",
      "Debre Berhan Selassie Church",
      "Fasilides Bath",
      "Timkat Festival celebrations",
    ],
    thingsToDo: [
      "Explore the medieval castles",
      "Visit Debre Berhan Selassie Church with its angel-covered ceiling",
      "Attend Timkat Festival (January)",
      "Discover local markets",
    ],
    historicalImportance:
      "Gondar served as Ethiopia's capital from 1636 to 1855, and its architecture shows Portuguese, Indian and Moorish influences.",
  },
  {
    id: "axum",
    slug: "axum",
    name: "Axum, Ethiopia",
    image: "/aksum.jpg",
    gallery: ["bg-73.jpg", "bg-32.jpg", "bg-33.jpg"],
    description:
      "Ancient city with towering obelisks, royal tombs, and ruins of palaces that was once the center of the powerful Aksumite Empire.",
    rating: 4.5,
    reviews: 118,
    city: "Axum",
    activities: ["Historical", "Archaeological", "Religious"],
    region: "Northern Ethiopia, Tigray Region",
    mapEmbed: "",
    bestTimeToVisit: "October to March",
    highlights: [
      "Obelisks (stelae) of Axum",
      "Church of St. Mary of Zion",
      "Queen of Sheba's Palace ruins",
      "Ark of the Covenant (not viewable)",
    ],
    thingsToDo: [
      "Marvel at the ancient stelae",
      "Visit the Church of St. Mary of Zion",
      "Explore the archaeological museum",
      "See the Queen of Sheba's Bath",
    ],
    historicalImportance:
      "Axum was the center of the Aksumite Empire, one of the world's four great powers in the 3rd century, alongside Rome, Persia, and China.",
    culturalSignificance:
      "Ethiopians believe the original Ark of the Covenant is housed in the Chapel of the Tablet next to St. Mary of Zion Church.",
  },
  {
    id: "bale-mountains",
    slug: "bale-mountains",
    name: "Bale Mountains, Ethiopia",
    image: "bale-2.jpg",
    gallery: ["bg-73.jpg", "bg-32.jpg", "bg-33.jpg"],
    description:
      "A biodiversity hotspot with alpine plateaus, cloud forests, and volcanic outcrops, home to rare Ethiopian wolves and over 300 bird species.",
    rating: 4.7,
    reviews: 142,
    city: "Bale",
    activities: ["Trekking", "Wildlife", "Nature"],
    region: "Southeastern Ethiopia, Oromia Region",
    mapEmbed: "",
    bestTimeToVisit: "November to March",
    highlights: [
      "Sanetti Plateau",
      "Ethiopian wolves",
      "Harenna Forest",
      "Web Valley",
    ],
    thingsToDo: [
      "Spot the endangered Ethiopian wolf",
      "Trek across the Sanetti Plateau",
      "Birdwatching for endemic species",
      "Visit the Harenna Forest",
    ],
    naturalFeatures:
      "The park contains the largest continuous area of Afroalpine habitat in Africa and is home to numerous endemic species.",
  },
  {
    id: "omo-valley",
    slug: "omo-valley",
    name: "Omo Valley, Ethiopia",
    image: "/omo-2.jpg",
    gallery: ["bg-73.jpg", "bg-32.jpg", "bg-33.jpg"],
    description:
      "Cultural melting pot where diverse indigenous tribes maintain their traditional ways of life, known for colorful ceremonies and body art.",
    rating: 4.6,
    reviews: 165,
    city: "Jinka",
    activities: ["Cultural", "Tribal", "Photography"],
    region: "Southwestern Ethiopia, Southern Nations Region",
    mapEmbed: "",
    bestTimeToVisit: "September to March",
    highlights: [
      "Tribal villages (Mursi, Hamer, Karo, Daasanach)",
      "Traditional ceremonies and dances",
      "Body painting and adornment",
      "Weekly markets",
    ],
    thingsToDo: [
      "Visit tribal villages with local guides",
      "Attend traditional ceremonies (bull jumping, etc.)",
      "Explore local markets",
      "Learn about traditional crafts",
    ],
    culturalSignificance:
      "The Lower Omo Valley is a UNESCO World Heritage site and home to some of Africa's most traditional ethnic groups who have maintained their cultural practices for centuries.",
  },
  {
    id: "addis-ababa",
    slug: "addis-ababa",
    name: "Addis Ababa, Ethiopia",
    image: "/bg-69.jpg",
    gallery: ["bg-73.jpg", "bg-32.jpg", "bg-33.jpg"],
    description:
      "Ethiopia's vibrant capital and diplomatic hub with museums, markets, and restaurants showcasing the country's rich history and diverse cuisine.",
    rating: 4.4,
    reviews: 210,
    city: "Addis Ababa",
    activities: ["Urban", "Cultural", "Culinary"],
    region: "Central Ethiopia",
    mapEmbed: "",
    bestTimeToVisit: "October to May",
    highlights: [
      "National Museum of Ethiopia",
      "Mercato (largest open-air market in Africa)",
      "Holy Trinity Cathedral",
      "Entoto Mountain",
    ],
    thingsToDo: [
      "See Lucy at the National Museum",
      "Shop at Mercato",
      "Taste traditional Ethiopian coffee",
      "Enjoy live Ethiopian music and dance",
    ],
    historicalImportance:
      "Founded in 1886, Addis Ababa ('New Flower') is home to the African Union headquarters and many international organizations.",
    culturalSignificance:
      "The city represents the meeting point of Ethiopia's many cultures and is known for its distinctive cuisine, music, and coffee ceremonies.",
  },
];

export default destinations;
