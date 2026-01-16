"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Logo } from "../global/Logo";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginContent } from "./LoginContent";
import { SignupContent } from "./SignupContent";

interface Props {
  isLogin?: boolean;
}

export const AuthForm = ({ isLogin }: Props) => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      <div className="p-3 top-0 left-0 absolute">
        <Button variant={"link"} size={"sm"} onClick={() => router.push("/")}>
          <ArrowLeftIcon className="h-4 w-4 shrink-0" />
          <span>Torna alla homepage</span>
        </Button>
      </div>
      <Logo size="lg" isLink />
      <h1 className="text-3xl text-center font-medium mt-5">
        {isLogin ? "Felici di rivederti!" : "Crea il tuo account"}
      </h1>
      <Card className="w-full max-w-md mt-10 mb-5">
        <CardContent>
          {isLogin ? <LoginContent /> : <SignupContent />}
        </CardContent>
      </Card>
      <p className="text-sm">
        <span>{isLogin ? "Non hai un account? " : "Hai già un account? "}</span>
        <Link
          href={isLogin ? "/signup" : "/login"}
          className="text-remuni-indigo font-medium"
        >
          {isLogin ? "Registrati" : "Accedi"}
        </Link>
      </p>
    </div>
  );
};
