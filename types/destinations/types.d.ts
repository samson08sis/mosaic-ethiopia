export interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  rating: number;
  reviews: number;
  city: string;
  region: string;
  mapEmbed: string;
  activities: string[];
  bestTimeToVisit: string;
  highlights: string[];
  thingsToDo: string[];
  culturalSignificance?: string;
  historicalImportance?: string;
  naturalFeatures?: string;
}

export interface MinimalDestination {
  slug: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  activities: string[];
}
