export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    web?: string;
  };
};

export type SocialLink = {
  key: string;
  hrefPrefix: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
};
