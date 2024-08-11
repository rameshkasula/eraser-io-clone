"use client";

import { LifeBuoy, Triangle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chatSidebarItems } from "@/lib/chat-sidebar-items";
import AccountPopover from "@/shared/common/user-profile";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/users-store";
import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const { fetchUsers } = useUserStore();

  React.useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [fetchUsers, session]);

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          {chatSidebarItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={item.name}
                >
                  <item.icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <AccountPopover user={session?.user} />
        </nav>
      </aside>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
