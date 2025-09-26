import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const days = searchParams.get("days");

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return new Response("Weather API key not configured", { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
        location!
      )}&days=${days}&aqi=no&alerts=no`
    );

    if (!res.ok) {
      return new Response(`Weather API error: ${res.status}`, {
        status: res.status,
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(`Failed to fetch weather data: ${err.message}`, {
      status: 500,
    });
  }
}
