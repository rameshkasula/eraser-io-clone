import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from "bcrypt";
import { generateAccessToken } from "@/utils/common-helper";
import prisma from "@/utils/prisma-client";
import { ENV_VARIABLES } from "@/utils/constants";

const AUTH_SECRET = ENV_VARIABLES.authSecret || "secret";
const authUrl = ENV_VARIABLES.authURL || "http://localhost:8082";

const nextAuthOptions = {
  pages: {
    signIn: authUrl + "/auth/sign-in",
    signOut: authUrl + "/auth/sign-in",
    error: authUrl + "/auth/sign-in",
    verifyRequest: authUrl + "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }

          const { email, password } = credentials;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
          }

          const accessToken = generateAccessToken(user?.id);
          const { password: any, ...others } = user;
          let userData = { ...others, token: accessToken };

          return userData;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: AUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
};

export default nextAuthOptions; // export default authOptions;
