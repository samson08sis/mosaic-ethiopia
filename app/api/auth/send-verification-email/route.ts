import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const cookies = request.headers.get("cookie");

  try {
    const backendResponse = await fetch(
      `${BACKEND_URL}/api/auth/send-email-verification`,
      {
        method: "POST",
        headers: {
          ...(cookies && { Cookie: cookies }),
        },
        credentials: "include",
      }
    );

    const data = await backendResponse.json();

    return NextResponse.json(
      {
        success: backendResponse.ok,
        message:
          data.msg ||
          (backendResponse.ok
            ? "Verification email sent"
            : "Failed to send verification email"),
      },
      { status: backendResponse.status }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Network error while sending verification email",
      },
      { status: 500 }
    );
  }
}
