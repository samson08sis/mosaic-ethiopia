import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await fetch(
      `${backendUrl}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await backendResponse.json();

    return NextResponse.json(
      {
        success: backendResponse.ok,
        message:
          data.msg ||
          (backendResponse.ok
            ? "Password reset email sent"
            : "Failed to send password reset email"),
        ...data,
      },
      { status: backendResponse.status }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while processing password reset",
      },
      { status: 500 }
    );
  }
}
