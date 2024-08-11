"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { chatSidebarItems } from "@/lib/chat-sidebar-items";
import { usePathname } from "next/navigation";
import AccountPopover from "../common/user-profile";
import { useSession } from "next-auth/react";
import { Package2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChatSidebar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {chatSidebarItems.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathName === item.href ? "bg-primary text-white" : ""
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item?.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item?.name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <AccountPopover user={session?.user} />
      </nav>
    </aside>
  );
}
