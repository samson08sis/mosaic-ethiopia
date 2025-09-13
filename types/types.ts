// 1. Home Page

export type HeroSlideType = {
  image: string;
  alt?: string;
};

type UserBasicProfile = {
  name: string;
  avatar?: string;
  location?: string;
};

export interface Testimonial {
  rating: number;
  quote: string;
  votes?: number;
  user: UserBasicProfile | string;
}

// 2. Destinations
