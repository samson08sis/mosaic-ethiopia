import { v4 as uuidv4 } from "uuid";
import { ChatSession } from "@/lib/db/models/chatSession";
import { cookies } from "next/headers";

export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set("sessionId", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return sessionId;
}

export const mergeSessions = async (sessionId: string, userId: string) => {
  // When user logs in, merge their anonymous session with their user account
  await ChatSession.updateMany({ sessionId }, { $set: { userId } });
};
