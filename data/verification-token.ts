import { db } from "@/lib/db";

export const getVerificationTokenById = async (identifier: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { identifier: identifier },
    });
    return verificationToken;
  } catch (error) {
    console.error("Error getting verification token", error);
  }
};
