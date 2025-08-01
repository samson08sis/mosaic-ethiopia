import { AuthResponse, UserResponse } from "@/types/auth";

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      throw data.errors;
    }
    throw new Error(data.msg || "Registration failed");
  }

  return data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/login", {
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
    throw new Error(data.msg || "Login failed");
  }

  return data;
};

export const logout = async (): Promise<void> => {
  const response = await fetch("/api/auth/logout", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || "Logout failed");
  }
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
};

export const sendVerificationEmail = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch("/api/auth/send-verification-email", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    return response.ok
      ? { success: true, message: data.msg || "Verification email sent" }
      : {
          success: false,
          message: data.msg || "Failed to send verification email",
        };
  } catch (error) {
    return {
      success: false,
      message: "Network error while sending verification email",
    };
  }
};

export const verifyEmail = async (token: string): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      throw data.errors;
    }
    throw new Error(data.msg || "Email verification failed");
  }

  return data;
};

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message:
        data.msg ||
        (response.ok
          ? "Password reset email sent"
          : "Failed to send password reset email"),
      ...data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error while processing password reset",
    };
  }
};
