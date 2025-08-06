import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return;
  }

  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    // sameSite: "none",
    path: "/",
  };

  cookieStore.set("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  cookieStore.set("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return NextResponse.redirect(
    `${process.env.DOMAIN || "https://mosaic-tour-app.vercel.app"}/dashboard`
  );
}
