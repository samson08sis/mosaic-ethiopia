export interface Package {
  id: string;
  name: string;
  price: number;
  duration: number;
  destinations: string[];
  activities: string[];
  image?: string;
  maxSpace?: number;
  accommodationOptions: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
  mealOptions: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
  additionalActivities: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
}

export interface Customization {
  duration: number;
  activities: string[];
  selectedActivities: string[];
  accommodation: string;
  meals: string;
}
