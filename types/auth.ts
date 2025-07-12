export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  avatar?: string;
  phone?: string;
  address?: string;
  country?: string;
  bio?: string;
  joined: Date;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
};

export type AuthError = {
  message: string;
  errors?: Array<{
    param: string;
    msg: string;
    location?: string;
    value?: string;
  }>;
  msg?: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: AuthError | null;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: User;
  errors?: any;
};

export type UserResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean;
    joined: Date;
  };
};

export type AuthContextType = AuthState & {
  register: (name: string, email: string, password: string) => Promise<void>; // Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<void>; // Promise<AuthResponse>;
  logout: () => Promise<void>; // Promise<AuthResponse>;
  loadUser: () => Promise<void>;
  sendVerificationEmail: () => Promise<AuthResponse>;
  updateUserProfile: (updatedUser: User) => void;
  verifyEmail: (token: string) => Promise<{
    success: boolean;
    message: string;
  }>;
};
