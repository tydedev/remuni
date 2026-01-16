import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signupSchema } from "@/schema/SignupSchema";

export async function POST(request: Request) {
  const body = await request.json();
  const result = signupSchema().safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "INVALID_FIELDS" }, { status: 400 });
  }

  const { email, password } = result.data;

  try {
    const existedUser = await db.user.findUnique({
      where: { email },
    });

    if (existedUser) {
      return NextResponse.json(
        { error: "USER_ALREADY_EXISTS" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
