"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Define types
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  country?: string;
  bio?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserProfile: (updatedUser: User) => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing
const demoUser: User = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  avatar: "/icons/user.png",
  phone: "+1 (555) 123-4567",
  country: "United States",
  preferences: {
    notifications: true,
    newsletter: true,
    darkMode: false,
  },
};

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just check against our demo user
    if (email === "demo@example.com" && password === "password") {
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(demoUser));
      return { success: true, message: "Login successful" };
    }

    return { success: false, message: "Invalid email or password" };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Update user profile
  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
