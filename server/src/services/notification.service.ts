import { prisma } from "../lib/prisma.js";

export interface NotifyInput {
  type: "friend_request" | "achievement" | "battle" | "store" | "system";
  title: string;
  body?: string;
  link?: string;
}

/** Creates an in-app notification (best-effort — never throws into callers). */
export async function notify(userId: string, input: NotifyInput): Promise<void> {
  try {
    await prisma.notification.create({ data: { userId, ...input } });
  } catch {
    /* non-fatal */
  }
}
