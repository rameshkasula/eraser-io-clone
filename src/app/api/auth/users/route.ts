// register user api
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/utils/database-helper";
import prisma from "@/utils/prisma-client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        status: 400,
        message: "All fields are required",
      });
    }

    // todo: connect to db
    await connectToDatabase();

    // todo: add password hashing
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        // @ts-ignore
        message: error?.message || "Something went wrong",
        error: error,
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// API to list all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        // @ts-ignore
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
