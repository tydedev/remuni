"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Logo } from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "../spinners/Spinner";
import { useState } from "react";

export const NavBar = () => {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const route = useRouter();

  if (status === "loading") {
    return (
      <nav className="h-12 flex items-center px-3">
        <Logo size="sm" hasText isLink />
      </nav>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    route.push("/login");
  };

  return (
    <nav className="h-12 flex items-center px-3">
      <Logo size="sm" hasText isLink />
      <div className="ml-auto space-x-2">
        {!session && (
          <>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => route.push("/login")}
            >
              Accedi
            </Button>
            <Button size={"sm"} onClick={() => route.push("/signup")}>
              Registrati
            </Button>
          </>
        )}
        {session && (
          <>
            <span className="text-sm">Ciao, {session.user?.email}</span>
            <Button size="sm" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? <Spinner size="sm" /> : "Logout"}
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
