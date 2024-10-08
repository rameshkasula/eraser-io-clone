/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { Bell, Menu, Package2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { roleBasedItems } from "@/lib/sidebar-items";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import dynamic from "next/dynamic";
import * as React from "react";
import useTeams, { Team } from "@/hooks/teams-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppCommand from "@/shared/common/app-command";
import CreateFile from "@/shared/dashboard/create-file";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { useFileStore } from "@/hooks/files-store";
import { ENV_VARIABLES } from "@/utils/constants";
import Filters from "@/shared/layouts/Filters";
import { useUserStore } from "@/hooks/users-store";

const AccountPopover = dynamic(() => import("@/shared/common/user-profile"), {
  ssr: false,
});

const AppLoader = dynamic(() => import("@/shared/common/app-loader"), {
  ssr: false,
});

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // current tab
  const { data: session } = useSession(); // get the client session

  // @ts-ignore
  const userRole = session?.user?.role ?? "PERSONAL";

  const sidebarItems = roleBasedItems(userRole);

  const { teamsList, selectedTeam, setSelectedTeam, fetchTeamsList }: any =
    useTeams();
  const { user, setUser }: any = useUserStore();

  const { files } = useFileStore();

  React.useEffect(() => {
    if (session) {
      if (!user) {
        setUser(session?.user);
      }

      if (userRole != "PERSONAL") {
        fetchTeamsList();
      }
    }
  }, [session, user, pathname]);

  const progressValue = (files?.length / 5) * 100;

  return (
    <React.Suspense
      fallback={<AppLoader text="Loading..." className="min-h-screen" />}
    >
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="">{ENV_VARIABLES.appName}</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              {session && userRole == "BUSINESS" && (
                <Select
                  value={selectedTeam}
                  onValueChange={(e) => {
                    setSelectedTeam(e);
                  }}
                >
                  <SelectTrigger className="w-[90%] mx-2 my-2">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {teamsList?.length > 0 &&
                        teamsList?.map((team: Team) => {
                          return (
                            /* @ts-ignore */
                            <SelectItem key={team?.id} value={team?.id}>
                              <div className="flex flex-1 justify-between items-center ">
                                <Avatar className="mr-2 h-8 w-8 ">
                                  <AvatarFallback>
                                    {/* @ts-ignore */}
                                    {team?.name[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                {/* @ts-ignore */}
                                {team?.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                      pathname.includes(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                    {item?.href == "/teams" && teamsList.length && (
                      <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        {teamsList.length}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4">
              <CreateFile />
              {progressValue > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Progress
                      className={cn("w-full my-2")}
                      color={progressValue > 100 ? "primary" : "success"}
                      value={progressValue}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <Label className="w-full">
                      {progressValue <= 100
                        ? `${progressValue}% Used`
                        : "100% Used"}
                    </Label>
                  </TooltipContent>
                </Tooltip>
              )}

              <Card className="w-full my-2" x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Link href={"/pricing"}>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                      {item.href == "/teams" && (
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          {teamsList.length}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <CreateFile />
                  {progressValue > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress
                          className={cn("w-full my-2")}
                          color={progressValue > 100 ? "primary" : "success"}
                          value={progressValue}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <Label className="w-full">
                          {progressValue <= 100
                            ? `${progressValue}% Used`
                            : "100% Used"}
                        </Label>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>{/* <AppCommand /> */}</form>
            </div>
            {/* <ThemeColorToggle />
            <ModeToggle /> */}
            <AccountPopover user={session?.user} />
          </header>
          <div className="flex flex-1 flex-col gap-2 p-4 lg:gap-4 lg:p-6">
            {!pathname?.includes("settings") &&
              !pathname?.includes("links") &&
              !pathname?.includes("workspace/") && <Filters />}
            {children}
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
