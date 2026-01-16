import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  // se non loggato → redirect
  if (!session) redirect("/login");

  // se email non verificata → redirect
  if (!session.user.emailVerified) redirect("/");

  return <div>{children}</div>;
};

export default PrivateLayout;
