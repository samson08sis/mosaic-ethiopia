import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/profile", "/bookings", "/admin"];
const openPaths = ["/login", "/forgot-password", "/reset-password"];

const supportedLocales = ["en", "es", "fr", "de"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Locale Detection
  const localeInPath = supportedLocales.find((loc) =>
    pathname.startsWith(`/${loc}`)
  );

  if (!localeInPath) {
    const acceptLang = request.headers.get("accept-language") || "";
    const preferredLang = acceptLang.split(",")[0].split("-")[0]; // "en-US" → "en"
    const locale = supportedLocales.includes(preferredLang)
      ? preferredLang
      : defaultLocale;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Auth Logic
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const strippedPath = pathname.replace(`/${localeInPath}`, "") || "/";

  const isProtected = protectedPaths.some((route) =>
    strippedPath.startsWith(route)
  );
  const isOpen = openPaths.some((route) => strippedPath.startsWith(route));

  // Protected paths
  if (isProtected && !refreshToken) {
    return NextResponse.redirect(
      new URL(`/${localeInPath}/login`, request.url)
    );
  }

  // Public paths
  if (isOpen && refreshToken) {
    return NextResponse.redirect(new URL(`/${localeInPath}/`, request.url));
  }

  try {
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL(`/${localeInPath}/`, request.url));
  }
}
