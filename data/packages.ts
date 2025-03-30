export interface Activity {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface MealOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface TourPackage {
  id: string;
  name: string;
  image: string;
  price: number;
  duration: number;
  destinations: string[];
  activities: string[];
  accommodation: string;
  meals: string;
  inclusions: string[];
  exclusions: string[];
  additionalActivities: Activity[];
  accommodationOptions: AccommodationOption[];
  mealOptions: MealOption[];
  description?: string;
}

const packages: TourPackage[] = [
  {
    id: "1",
    name: "Ethiopian Historical Route",
    image: "/bg-6.jpg",
    price: 1299,
    duration: 8,
    destinations: ["Lalibela", "Gondar", "Axum", "Bahir Dar"],
    activities: [
      "Church Tours",
      "Castle Visits",
      "Boat Trip on Lake Tana",
      "Blue Nile Falls",
    ],
    accommodation: "3-4 Star Hotels",
    meals: "Breakfast and Dinner",
    inclusions: [
      "Airport transfers",
      "Domestic flights",
      "English-speaking guide",
      "Entrance fees",
      "Welcome dinner",
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Lunch meals",
      "Personal expenses",
    ],
    additionalActivities: [
      {
        id: "coffee",
        name: "Traditional Coffee Ceremony",
        price: 35,
        description:
          "Experience Ethiopia's famous coffee ceremony with local families",
      },
      {
        id: "tejbet",
        name: "Tej House Visit",
        price: 45,
        description:
          "Visit a traditional house to taste tej (honey wine) and local music",
      },
      {
        id: "cooking",
        name: "Ethiopian Cooking Class",
        price: 65,
        description: "Learn to prepare injera and traditional Ethiopian dishes",
      },
      {
        id: "shopping",
        name: "Craft Shopping Tour",
        price: 40,
        description:
          "Guided shopping for traditional crafts with expert advice",
      },
    ],
    accommodationOptions: [
      {
        id: "standard",
        name: "3-4 Star Hotels",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "deluxe",
        name: "4-5 Star Hotels",
        price: 350,
        description: "Upgrade to premium hotels where available",
      },
      {
        id: "guesthouse",
        name: "Local Guesthouses",
        price: -200,
        description: "Authentic experience with local families",
      },
    ],
    mealOptions: [
      {
        id: "breakfast",
        name: "Breakfast Only",
        price: -150,
        description: "Reduce package price",
      },
      {
        id: "half",
        name: "Breakfast and Dinner",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "full",
        name: "Full Board",
        price: 200,
        description: "All meals included",
      },
    ],
    description:
      "Explore Ethiopia's rich history through its ancient churches, castles, and historical sites. This journey takes you through the northern historical circuit, visiting UNESCO World Heritage sites and experiencing the country's deep cultural heritage.",
  },
  {
    id: "2",
    name: "Ethiopian Nature & Wildlife",
    image: "/bg-12.jpg",
    price: 1599,
    duration: 10,
    destinations: [
      "Simien Mountains",
      "Bale Mountains",
      "Awash National Park",
      "Lake Langano",
    ],
    activities: [
      "Trekking",
      "Wildlife Viewing",
      "Bird Watching",
      "Hot Springs",
    ],
    accommodation: "Mix of Hotels and Lodges",
    meals: "Full Board",
    inclusions: [
      "All transportation",
      "Park entrance fees",
      "Experienced guides",
      "Camping equipment",
      "All meals",
    ],
    exclusions: [
      "International flights",
      "Alcoholic beverages",
      "Personal equipment",
      "Travel insurance",
    ],
    additionalActivities: [
      {
        id: "gelada",
        name: "Gelada Baboon Tracking",
        price: 75,
        description:
          "Dedicated tracking of the endemic Gelada baboons with a specialist",
      },
      {
        id: "fishing",
        name: "Fishing on Lake Langano",
        price: 60,
        description: "Half-day fishing trip with equipment provided",
      },
      {
        id: "hotair",
        name: "Hot Air Balloon Ride",
        price: 250,
        description: "Sunrise balloon ride over the Ethiopian highlands",
      },
      {
        id: "nightsafari",
        name: "Night Safari",
        price: 85,
        description:
          "Evening wildlife spotting with spotlight in Awash National Park",
      },
    ],
    accommodationOptions: [
      {
        id: "mixed",
        name: "Mix of Hotels and Lodges",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "camping",
        name: "Full Camping Experience",
        price: -300,
        description: "Camp under the stars every night",
      },
      {
        id: "luxury",
        name: "Luxury Lodges",
        price: 450,
        description: "Upgrade to premium lodges where available",
      },
    ],
    mealOptions: [
      {
        id: "half",
        name: "Half Board",
        price: -200,
        description: "Breakfast and dinner only",
      },
      {
        id: "full",
        name: "Full Board",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "gourmet",
        name: "Gourmet Experience",
        price: 300,
        description: "Premium meals with local specialties",
      },
    ],
    description:
      "Discover Ethiopia's incredible biodiversity and stunning landscapes. From the endemic wildlife of the Simien Mountains to the unique flora of the Bale Mountains, this tour showcases the country's natural wonders and offers opportunities for hiking, wildlife viewing, and connecting with nature.",
  },
  {
    id: "3",
    name: "Danakil Depression Expedition",
    image: "/bg-50.jpg",
    price: 1899,
    duration: 6,
    destinations: [
      "Danakil Depression",
      "Erta Ale Volcano",
      "Dallol",
      "Afar Region",
    ],
    activities: [
      "Volcano Hiking",
      "Salt Flats Visit",
      "Hot Springs",
      "Camel Caravan Observation",
    ],
    accommodation: "Basic Hotels and Camping",
    meals: "Full Board",
    inclusions: [
      "4WD transportation",
      "Camping equipment",
      "Armed escorts",
      "Local guides",
      "All meals and water",
    ],
    exclusions: [
      "International flights",
      "Domestic flights to/from Mekele",
      "Alcoholic beverages",
      "Tips",
    ],
    additionalActivities: [
      {
        id: "helicopter",
        name: "Helicopter Tour",
        price: 450,
        description: "Aerial view of the colorful Danakil landscape",
      },
      {
        id: "saltmine",
        name: "Salt Mining Experience",
        price: 65,
        description: "Try traditional salt mining with local Afar people",
      },
      {
        id: "camelride",
        name: "Camel Riding",
        price: 40,
        description: "Cross the salt plains on camelback",
      },
      {
        id: "stargazing",
        name: "Guided Stargazing",
        price: 35,
        description: "Night sky observation with expert astronomer",
      },
    ],
    accommodationOptions: [
      {
        id: "basic",
        name: "Basic Hotels and Camping",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "upgraded",
        name: "Upgraded Camping",
        price: 150,
        description: "Better tents and camping facilities",
      },
      {
        id: "hotel",
        name: "Hotels Only",
        price: 300,
        description: "No camping, hotels where possible",
      },
    ],
    mealOptions: [
      {
        id: "standard",
        name: "Standard Meals",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "premium",
        name: "Premium Meals",
        price: 120,
        description: "Higher quality food and more variety",
      },
      {
        id: "special",
        name: "Special Diet",
        price: 80,
        description: "Vegetarian, vegan or other special diets",
      },
    ],
    description:
      "Journey to one of the hottest and most geologically active places on Earth. The Danakil Depression offers otherworldly landscapes of colorful mineral deposits, salt flats, and active volcanoes. This expedition is challenging but rewards adventurous travelers with some of the most unique scenery on the planet.",
  },
  {
    id: "4",
    name: "Omo Valley Cultural Immersion",
    image: "/omo-4.jpg",
    price: 1799,
    duration: 9,
    destinations: ["Omo Valley", "Konso", "Jinka", "Turmi"],
    activities: [
      "Tribal Village Visits",
      "Local Markets",
      "Cultural Ceremonies",
      "Museum Visits",
    ],
    accommodation: "Hotels and Guest Houses",
    meals: "Breakfast and Dinner",
    inclusions: [
      "4WD transportation",
      "English-speaking guide",
      "Local guides",
      "Entrance fees",
      "Photography permits",
    ],
    exclusions: [
      "International flights",
      "Alcoholic beverages",
      "Special ceremonies",
      "Personal gifts to locals",
    ],
    additionalActivities: [
      {
        id: "bullJumping",
        name: "Bull Jumping Ceremony",
        price: 120,
        description:
          "Witness the Hamer tribe's coming-of-age ceremony (seasonal)",
      },
      {
        id: "bodyPainting",
        name: "Body Painting with Karo Tribe",
        price: 85,
        description: "Learn and participate in traditional body painting",
      },
      {
        id: "boatTrip",
        name: "Omo River Boat Trip",
        price: 70,
        description: "Travel along the Omo River to remote villages",
      },
      {
        id: "craftWorkshop",
        name: "Traditional Craft Workshop",
        price: 45,
        description: "Learn beadwork or pottery from tribal artisans",
      },
    ],
    accommodationOptions: [
      {
        id: "standard",
        name: "Hotels and Guest Houses",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "homestay",
        name: "Tribal Homestays",
        price: -100,
        description: "Stay with local families (basic conditions)",
      },
      {
        id: "comfort",
        name: "Comfort Upgrade",
        price: 250,
        description: "Best available accommodations in each location",
      },
    ],
    mealOptions: [
      {
        id: "breakfast",
        name: "Breakfast Only",
        price: -150,
        description: "Reduce package price",
      },
      {
        id: "half",
        name: "Breakfast and Dinner",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "full",
        name: "Full Board",
        price: 180,
        description: "All meals included",
      },
    ],
    description:
      "Experience the diverse cultures and traditions of Ethiopia's Omo Valley, home to some of Africa's most fascinating indigenous tribes. Visit local markets, participate in cultural ceremonies, and learn about the unique customs and lifestyles of the various ethnic groups in this culturally rich region.",
  },
  {
    id: "5",
    name: "Ethiopian Coffee Trail",
    image: "/bg-68.jpg",
    price: 1299,
    duration: 7,
    destinations: ["Addis Ababa", "Jimma", "Kaffa", "Yirgacheffe"],
    activities: [
      "Coffee Farm Visits",
      "Cupping Sessions",
      "Coffee Ceremonies",
      "Roastery Tours",
    ],
    accommodation: "3-4 Star Hotels",
    meals: "Breakfast and Coffee Tastings",
    inclusions: [
      "All transportation",
      "Expert coffee guide",
      "Farm entrance fees",
      "Coffee samples to take home",
    ],
    exclusions: [
      "International flights",
      "Alcoholic beverages",
      "Personal expenses",
      "Additional meals",
    ],
    additionalActivities: [
      {
        id: "barista",
        name: "Barista Workshop",
        price: 60,
        description: "Learn professional coffee preparation techniques",
      },
      {
        id: "roasting",
        name: "Coffee Roasting Class",
        price: 75,
        description: "Hands-on experience roasting green coffee beans",
      },
      {
        id: "wildcoffee",
        name: "Wild Coffee Forest Trek",
        price: 90,
        description: "Hike through forests where coffee grows naturally",
      },
      {
        id: "marketTour",
        name: "Coffee Market Tour",
        price: 40,
        description: "Visit Ethiopia's Coffee Exchange and local markets",
      },
    ],
    accommodationOptions: [
      {
        id: "standard",
        name: "3-4 Star Hotels",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "farmstay",
        name: "Coffee Farm Homestays",
        price: -150,
        description: "Stay with coffee farming families",
      },
      {
        id: "luxury",
        name: "Luxury Hotels",
        price: 300,
        description: "5-star accommodations where available",
      },
    ],
    mealOptions: [
      {
        id: "light",
        name: "Breakfast and Coffee Tastings",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "half",
        name: "Half Board",
        price: 150,
        description: "Add dinner at selected restaurants",
      },
      {
        id: "full",
        name: "Full Board",
        price: 280,
        description: "All meals included",
      },
    ],
    description:
      "Follow the journey of coffee from its birthplace in Ethiopia. Visit coffee farms, participate in traditional coffee ceremonies, and learn about the cultivation, processing, and cultural significance of coffee in its country of origin. Perfect for coffee enthusiasts and cultural explorers alike.",
  },
  {
    id: "6",
    name: "Ethiopian Festivals & Celebrations",
    image: "/bg-70.jpg",
    price: 1499,
    duration: 10,
    destinations: ["Gondar", "Lalibela", "Addis Ababa", "Axum"],
    activities: [
      "Timkat Festival",
      "Meskel Celebration",
      "Religious Ceremonies",
      "Cultural Performances",
    ],
    accommodation: "3-4 Star Hotels",
    meals: "Breakfast and Special Festival Dinners",
    inclusions: [
      "All transportation",
      "Festival access",
      "Cultural guide",
      "Special event seating",
      "Welcome dinner",
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Personal expenses",
      "Some meals",
    ],
    additionalActivities: [
      {
        id: "vip",
        name: "VIP Festival Access",
        price: 150,
        description: "Premium viewing positions and special access",
      },
      {
        id: "photoWorkshop",
        name: "Festival Photography Workshop",
        price: 120,
        description: "Expert guidance for capturing festival moments",
      },
      {
        id: "musicClass",
        name: "Traditional Music Class",
        price: 65,
        description: "Learn Ethiopian instruments and rhythms",
      },
      {
        id: "danceLessons",
        name: "Ethiopian Dance Lessons",
        price: 50,
        description: "Learn traditional Eskista shoulder dancing",
      },
    ],
    accommodationOptions: [
      {
        id: "standard",
        name: "3-4 Star Hotels",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "deluxe",
        name: "4-5 Star Hotels",
        price: 400,
        description: "Luxury accommodations",
      },
      {
        id: "historic",
        name: "Historic Hotels",
        price: 200,
        description: "Stay in heritage properties where available",
      },
    ],
    mealOptions: [
      {
        id: "breakfast",
        name: "Breakfast Only",
        price: -200,
        description: "Reduce package price",
      },
      {
        id: "festival",
        name: "Breakfast and Festival Dinners",
        price: 0,
        description: "Included in package price",
      },
      {
        id: "full",
        name: "Full Board",
        price: 250,
        description: "All meals included",
      },
    ],
    description:
      "Time your visit to coincide with Ethiopia's vibrant festivals and celebrations. Experience the colorful Timkat (Epiphany) celebrations, the Meskel Festival commemorating the finding of the True Cross, or other significant religious and cultural events that showcase Ethiopia's living traditions.",
  },
];

export default packages;
