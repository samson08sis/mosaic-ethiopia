// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const BACKEND_URL = process.env.BACKEND_URL;
  const cookies = request.headers.get("cookie");

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        ...(cookies && { Cookie: cookies }),
      },
      credentials: "include",
    });

    const response = new NextResponse(null, {
      status: backendResponse.status,
    });

    // Forward any cookies from the backend (likely a session clear)
    const backendCookies = backendResponse.headers.get("set-cookie");
    if (backendCookies) {
      response.headers.set("set-cookie", backendCookies);
    }

    // Add client-side cookie invalidation
    response.headers.append(
      "set-cookie",
      "refresh-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
    );

    if (!backendResponse.ok) {
      const data = await backendResponse.json();
      return NextResponse.json(
        { error: data.msg || "Logout failed" },
        { status: backendResponse.status }
      );
    }

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
