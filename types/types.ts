// 1. Home Page

export type HeroSlideType = {
  image: string;
  alt?: string;
};

export type Testimonial = {
  rating: number;
  quote: string;
  votes?: number;
  user:
    | {
        name: string;
        avatar?: string;
        location?: string;
      }
    | "anonymous";
};

// 2. Destinations
