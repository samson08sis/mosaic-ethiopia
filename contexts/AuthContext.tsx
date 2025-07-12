"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  AuthContextType,
  AuthError,
  AuthResponse,
  AuthState,
  User,
} from "@/types/auth";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  sendVerificationEmail as apiSendVerificationEmail,
  getCurrentUser,
} from "@/lib/api/auth";

const USER_DATA_KEY = process.env.NEXT_PUBLIC_USER_DATA_KEY;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getCachedUser = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const userData = localStorage.getItem(USER_DATA_KEY!);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

const cacheUser = (user: User | null) => {
  if (typeof window === "undefined") return null;

  try {
    user
      ? localStorage.setItem(USER_DATA_KEY!, JSON.stringify(user))
      : localStorage.removeItem(USER_DATA_KEY!);
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
    error: null,
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
          error: null,
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
        error: null,
      });
    } catch {
      cacheUser(null);
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const { user } = await apiRegister(name, email, password);
      if (user) {
        cacheUser(user);
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true,
          error: null,
        });
        router.push("/dashboard");
      } else cacheUser(null);
    } catch (err: any) {
      const authError: AuthError = {
        message: "Registration failed",
        msg: Array.isArray(err) ? undefined : err.message,
        errors: Array.isArray(err) ? err : undefined,
      };

      setAuthState((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
        error: authError,
      }));

      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const { user } = await apiLogin(email, password);
      if (user) {
        cacheUser(user);
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true,
          error: null,
        });
        router.push("/dashboard");
      } else {
        cacheUser(null);
      }
    } catch (err: any) {
      cacheUser(null);
      const authError: AuthError = {
        message: "Login failed",
        msg: Array.isArray(err) ? undefined : err.message,
        errors: Array.isArray(err) ? err : undefined,
      };

      setAuthState((prev) => ({
        ...prev,
        loading: false,
        isAuthenticated: false,
        error: authError,
      }));

      throw err;
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      await apiLogout();
      cacheUser(null);

      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      });

      router.push("/");
    } catch (err) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: {
          message: "Logout failed",
        },
      }));

      throw err;
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

  const verifyEmail = async (token: string) => {
    try {
      const result = await verifyEmail(token);
      setAuthState(
        (prev) =>
          ({ ...prev, user: { ...prev.user, verified: true } } as AuthState)
      );
      return { success: true, message: "Email verified successfully" };
    } catch (error) {
      let message = "Verification failed";
      if (error instanceof Error) message = error.message;
      if (Array.isArray(error)) message = error.join(", ");
      return { success: false, message };
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
        verifyEmail,
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
