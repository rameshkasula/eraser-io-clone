// register user api
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/utils/database-helper";
import prisma from "@/utils/prisma-client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
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
        message: "Something went wrong",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
