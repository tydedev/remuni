import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const CheckAuth = async (currentPath?: string) => {
  const session = await auth();

  if (!session) redirect("/");
  if (!session.user.emailVerified && currentPath === "/dashboard")
    redirect("/dashboard");

  return session;
};
