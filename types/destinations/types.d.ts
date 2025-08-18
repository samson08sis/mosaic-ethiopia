export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  activities: string[];
  location: string;
  nearestCity: string;
  bestTimeToVisit: string;
  highlights: string[];
  thingsToDo: string[];
  culturalSignificance?: string;
  historicalImportance?: string;
  naturalFeatures?: string;
}

export interface MinimalDestination {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  activities: string[];
}
