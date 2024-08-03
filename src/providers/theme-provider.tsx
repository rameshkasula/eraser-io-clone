"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";
import ThemeDataProvider from "./theme-data-provider";

const AppLoader = dynamic(() => import("@/shared/common/app-loader"), {
  ssr: false,
});

// TODO: App loader

// TODO: Add theme provider

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <React.Suspense
        fallback={
          <AppLoader text="Loading theme..." className="min-h-screen" />
        }
      >
        <ThemeDataProvider>{children}</ThemeDataProvider>
      </React.Suspense>
    </NextThemesProvider>
  );
}
