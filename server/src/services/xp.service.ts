import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

/**
 * Awards XP exactly once per (user, reason, lesson) — a unique constraint on
 * XpEvent makes repeat calls no-ops, so "complete lesson" can be hit safely
 * any number of times.
 *
 * @returns the amount actually awarded (0 if already granted)
 */
export async function awardXp(
  userId: string,
  amount: number,
  reason: string,
  lessonId?: string
): Promise<number> {
  try {
    await prisma.$transaction([
      prisma.xpEvent.create({ data: { userId, amount, reason, lessonId } }),
      prisma.user.update({ where: { id: userId }, data: { xp: { increment: amount } } }),
    ]);
    return amount;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return 0; // already awarded
    }
    throw err;
  }
}
