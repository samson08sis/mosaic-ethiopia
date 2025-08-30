import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const secret = body.secret;

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // revalidatePath("/"); // Revalidate home page
    revalidateTag("hero-section"); // Revalidate Hero section
    return NextResponse.json({ revalidated: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to revalidate: ${err.message}` },
      { status: 500 }
    );
  }
}
