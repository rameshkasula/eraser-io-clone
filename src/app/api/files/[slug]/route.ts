// single File => GET, PUT, DELETE

import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
  response: NextResponse
) {
  try {
    const fileId = request.nextUrl.searchParams.get("fileId");

    console.log("ffffffffffff", fileId);

    const file = await prisma.file.findUnique({
      // @ts-ignore
      where: { id: params.slug },
      include: { user: true },
    });
    return NextResponse.json({ file }, { status: 200 });
  } catch (error) {
    console.log(" files api error ", error);
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

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const file = await prisma.file.update({
      where: { id: body.id },
      data: data,
    });
    return NextResponse.json({ file }, { status: 200 });
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

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const file = await prisma.file.delete({
      where: { id: body.id },
    });
    return NextResponse.json({ file }, { status: 200 });
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
