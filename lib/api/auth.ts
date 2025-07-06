import { AuthResponse } from "@/types/auth";

const LOCAL_BACKEND_URL = "http://localhost:5000";

type UserResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean;
    joined: Date;
  };
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${LOCAL_BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Registry failed");
  }

  return response.json();
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${LOCAL_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      throw data.errors;
    }
    throw new Error(data.message || "Login failed");
    // const errorMessage = data.errors || data.message || "Login failed";
    // throw new Error(errorMessage);
  }

  return data;
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${LOCAL_BACKEND_URL}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await fetch(`${LOCAL_BACKEND_URL}/api/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
};

export const sendVerificationEmail = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      `${LOCAL_BACKEND_URL}/api/auth/send-email-verification`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();
    return response.ok
      ? { success: true, message: data.message || "Verification email sent" }
      : {
          success: false,
          message: data.message || "Failed to send verification email",
        };
  } catch (error) {
    return {
      success: false,
      message: "Network error while sending verification email",
    };
  }
};
