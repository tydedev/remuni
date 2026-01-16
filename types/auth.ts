import { User } from "next-auth";

declare module "@auth/core" {
  interface JWT {
    id: string;
    email?: string;
    name?: string | null;
    emailVerified?: Date | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      email?: string;
      emailVerified?: Date | null;
    };
  }
}
