import type { Metadata } from "next"; // Remove if not used
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { AppSessionProvider } from "@/providers/session-provider";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kasz.io",
  description: "AI powered markdown editor",
};

export default function RootLayout({
  children,
  session,
}: {
  // @ts-ignore
  children: React.ReactNode;
  // @ts-ignore
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppSessionProvider session={session}>{children}</AppSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
