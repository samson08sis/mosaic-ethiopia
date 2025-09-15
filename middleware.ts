import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/profile", "/bookings", "/admin"];
const openPaths = ["/login", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the refresh-token
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtected = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );
  const isOpen = openPaths.some((route) => pathname.startsWith(route));

  // REDIRECT IF NOT AUTHENTICATED FOR PROTECTED PAGES
  if (isProtected && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // REDIRECT IF AUTHENTICATED FOR NON-LOGGED-IN PAGES
  if (isOpen && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Verify the token using JWT. If faied it will throw an error
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
