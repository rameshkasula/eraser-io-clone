import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const file = await prisma.file.findUnique({
      where: { id: params.slug },
      include: { user: true },
    });

    if (!file) {
      return NextResponse.json({ message: "File not found." }, { status: 404 });
    }

    return NextResponse.json({ file }, { status: 200 });
  } catch (error: any) {
    console.error("Files API error:", error);
    return NextResponse.json(
      {
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    // Ensure the ID matches the slug parameter
    if (id !== params.slug) {
      return NextResponse.json(
        { message: "ID in the body does not match the slug." },
        { status: 400 }
      );
    }

    const file = await prisma.file.update({
      where: { id: params.slug },
      data: data,
    });

    return NextResponse.json({ file }, { status: 200 });
  } catch (error: any) {
    console.error("Files API error:", error);
    return NextResponse.json(
      {
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const file = await prisma.file.delete({
      where: { id: params.slug },
    });

    return NextResponse.json({ file }, { status: 200 });
  } catch (error: any) {
    console.error("Files API error:", error);
    return NextResponse.json(
      {
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
