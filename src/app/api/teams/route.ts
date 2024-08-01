// GET, POST => teams

import prisma from "@/utils/prisma-client";
import { NextResponse, NextRequest } from "next/server";

// GET => get all teams
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const organizationId =
      request.nextUrl.searchParams.get("organizationId") ?? "";
    const teams = await prisma.team.findMany({
      where: {
        organizationId: organizationId,
      },
    });

    return NextResponse.json({ teams }, { status: 200 });
  } catch (error: any) {
    // Explicitly define the type of the error variable
    return NextResponse.json(
      { error, message: error?.message || "", tip: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST => create team

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const body = await request.json();
    console.log(body);

    const team = await prisma.team.create({
      data: {
        name: body.name,
        organizationId: body?.organizationId,
        description: body.description,
        createdBy: body.createdBy,
      },
    });

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        message: error?.message || "An error occurred.",
        tip: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
