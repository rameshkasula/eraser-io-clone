import nextAuthOptions from "@/utils/auth-helper";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
