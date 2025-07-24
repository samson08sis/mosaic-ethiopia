import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const BACKEND_URL = process.env.LOCAL_BACKEND_URL;
  const authHeader = request.headers.get("authorization");
  const cookies = request.headers.get("cookie");

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        ...(authHeader && { Authorization: authHeader }),
        ...(cookies && { Cookie: cookies }),
      },
      credentials: "include",
    });

    const data = await backendResponse.json();
    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    const newCookies = backendResponse.headers.get("set-cookie");
    if (newCookies) {
      response.headers.set("set-cookie", newCookies);
    }

    return response;
  } catch (error) {
    console.error("Current user fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
