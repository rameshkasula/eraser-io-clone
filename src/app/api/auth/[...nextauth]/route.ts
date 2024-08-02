import nextAuthOptions from "@/utils/auth-helper";
import NextAuth from "next-auth";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = nextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
