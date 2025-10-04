// 1. Home Page

export type HeroSlideType = {
  image: string;
  alt?: string;
};

export interface UserBasicProfile {
  name: string;
  avatar?: string;
  location?: string;
}

export interface Testimonial {
  _id: string;
  anonymous: boolean;
  rating: number;
  quote: string;
  votes?: number;
  user: UserBasicProfile | "anonymous";
}

// 2. Destinations
