"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import NextTopLoader from "nextjs-toploader";

// TODO: Add session provider
// TODO: Add toast provider
// TODO: Next top loader

export function AppSessionProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <NextTopLoader />
        {children}
        <Toaster />
      </TooltipProvider>
    </SessionProvider>
  );
}
