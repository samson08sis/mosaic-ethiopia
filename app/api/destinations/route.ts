import destinations from "@/data/destinations";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    // const expressResponse = await fetch('http://localhost:3001/api/destinations'); // Your Express port
    // if (!expressResponse.ok) {
    //   return NextResponse.json(
    //     { error: 'Express server error' },
    //     { status: expressResponse.status }
    //   );
    // }
    // const data = await expressResponse.json();
    const data = destinations;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
