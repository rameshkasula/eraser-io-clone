"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import NextTopLoader from "nextjs-toploader";

export function AppSessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <TooltipProvider>
        <NextTopLoader />
        {children}
        <Toaster />
      </TooltipProvider>
    </SessionProvider>
  );
}
