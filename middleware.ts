import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const protectedPaths = ["/dashboard", "/profile", "/bookings", "/admin"];

  const path = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((route) => path.startsWith(route));

  if (isProtected && !refreshToken) {
    console.log("Redirected...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Verify the token using JWT. If faied it will throw an error
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
