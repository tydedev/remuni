import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { Adapter } from "@auth/core/adapters";
import bcrypt from "bcrypt";
import { db } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) return null;

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.hashedPassword as string
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email as string },
      });

      if (!dbUser) {
        token.id = user?.id;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }

      const user = await db.user.findUnique({
        where: { id: session.user.id },
      });

      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.image = user.image;
        session.user.emailVerified = user.emailVerified;
      }

      return session;
    },
  },
});
