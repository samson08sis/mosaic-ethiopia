import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const { token } = await request.json();
  try {
    const backendResponse = await fetch(
      `${BACKEND_URL}/api/auth/verify-reset-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        credentials: "include",
      }
    );

    const data = await backendResponse.json();
    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    // Forward any cookies from backend
    // const backendCookies = backendResponse.headers.get("set-cookie");
    // if (backendCookies) {
    //   response.headers.set("set-cookie", backendCookies);
    // }

    return response;
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
