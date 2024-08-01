"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import AppLoader from "@/shared/common/app-loader";
import { SessionProvider } from "next-auth/react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <React.Suspense
        fallback={
          <AppLoader text="Loading theme..." className="min-h-screen" />
        }
      >
        <SessionProvider>{children}</SessionProvider>
      </React.Suspense>
    </NextThemesProvider>
  );
}
