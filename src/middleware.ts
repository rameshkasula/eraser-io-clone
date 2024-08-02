import { User } from "next-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (
  request: NextRequest,
  response: NextResponse
) => {
  const pathname = request.nextUrl.pathname;

  const session: session = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/session`,
    {
      headers: headers(),
      cache: "no-store",
    }
  ).then(async (res) => await res.json());

  const loggedIn = session && Object.keys(session).length > 0 ? true : false;

  let publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up"];

  if (!publicRoutes.includes(pathname) && !loggedIn) {
    // console.log("redirecting");
    return NextResponse.redirect(
      new URL("/auth/sign-in", process.env.NEXTAUTH_URL)
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/teams/:p", "/subscription"],
};

type session = {} | User;
