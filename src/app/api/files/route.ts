import prisma from "@/utils/prisma-client";
import { NextResponse, NextRequest } from "next/server";

// NOTE : API to create file
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const file = await prisma.file.create({
      data: body,
      include: { user: true },
    });
    return NextResponse.json({ file }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error, // @ts-ignore
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// NOTE : API to get file
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const files = await prisma.file.findMany({
      // @ts-ignore
      where: { userId: request.nextUrl.searchParams.get("userId") },
      include: { user: true },
    });
    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error, // @ts-ignore
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
