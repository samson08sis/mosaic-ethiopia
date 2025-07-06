"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, AuthResponse, AuthState, User } from "@/types/auth";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  sendVerificationEmail as apiSendVerificationEmail,
  getCurrentUser,
} from "@/lib/api/auth";

// const nullUser = {
//   id: "fhj3iej3-9r98j9f384hf898j3ijf",
//   name: "Samson",
//   email: "my.mail@amail.ao",
//   verified: true,
//   avatar: "https://picsum.photos/300/300",
//   phone: "+2557349136",
// };

const USER_DATA_KEY = "auth_user_data";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getCachedUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

const cacheUser = (user: User | null) => {
  if (typeof window === "undefined") return null;

  try {
    user
      ? localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
      : localStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error("Failed to cache user data", error);
  }
};

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const cachedUser = getCachedUser();
      if (cachedUser !== null) {
        // Optimistically set the cached user while validating.
        setAuthState({
          user: cachedUser,
          isAuthenticated: true,
          loading: true,
        });
      }
      await loadUser();
    };

    initializeAuth();
  }, []);

  const loadUser = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const { user } = await getCurrentUser();
      cacheUser(user);
      setAuthState({
        user,
        loading: false,
        isAuthenticated: true,
      });
    } catch {
      cacheUser(null);
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const { user } = await apiRegister(name, email, password);
      cacheUser(user || null);
      if (user)
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true,
        });
      router.push("/dashboard");
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
      }));
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));

      const { user } = await apiLogin(email, password);

      cacheUser(user || null);
      if (user)
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true,
        });

      router.push("/dashboard");
    } catch (err) {
      console.log("Auth ERR: ");
      console.log(err);
      // console.log(
      //   "Auth ERR: ",
      //   err instanceof Error ? err.message : "An unknown error occured"
      // );
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
      }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      cacheUser(null);
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
      });
      router.push("/");
    }
  };

  const sendVerificationEmail = async (): Promise<AuthResponse> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const result = await apiSendVerificationEmail();

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));

      return result;
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      return {
        success: false,
        message: "Failed to send verification email",
      };
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedUser: User) => {
    // try {
    //   // 1. Call your Express backend login endpoint
    //   const response = await fetch(
    //     `http://localhost:5000/api/users/${user?.id}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach JWT
    //       },
    //       body: JSON.stringify(updatedUser),
    //     }
    //   );
    // } catch (error) {}
    // setUser(updatedUser);
    // localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loadUser,
        register,
        login,
        logout,
        sendVerificationEmail,
        updateUserProfile,
      }}>
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
