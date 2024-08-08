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
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        {children}
        <Toaster />
      </TooltipProvider>
    </SessionProvider>
  );
}
