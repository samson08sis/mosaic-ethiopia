import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const BACKEND_URL = process.env.BACKEND_URL;

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    const data = await backendResponse.json();
    const response = NextResponse.json(data, {
      status: backendResponse.status,
    });

    const cookies = backendResponse.headers.get("set-cookie");
    if (cookies) {
      response.headers.set("set-cookie", cookies);
    }

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
