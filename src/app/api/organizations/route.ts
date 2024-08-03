// Organizations

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma-client";

// GET => get all organizations
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const organizations = await prisma.organization.findMany();
    return NextResponse.json({ organizations }, { status: 200 });
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

// POST => create new organization
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    const organization = await prisma.organization.create({ data: body });
    return NextResponse.json({ organization }, { status: 201 });
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
