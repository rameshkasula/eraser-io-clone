"use client";

import Link from "next/link";
import { Bell, CircleUser, Menu, Package2 } from "lucide-react";

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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarItems } from "@/lib/sidebar-items";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";
import { Progress } from "@/components/ui/progress";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import * as React from "react";
import useTeams, { Team, TeamsState } from "@/hooks/teams-store";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppCommand from "@/shared/common/app-command";
import CreateFile from "@/shared/dashboard/create-file";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AccountPopover from "@/shared/common/user-profile";
import AppLoader from "@/shared/common/app-loader";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const {
    teamsList,
    setTeamsList,
    isLoading,
    setIsLoading,
    selectedTeam,
    setSelectedTeam,
    filesList,
    setFilesList,
    createOpen,
  }: any = useTeams();
  const convex = useConvex();
  const { user } = useKindeBrowserClient();

  React.useEffect(() => {
    async function getTeamsList() {
      setIsLoading(true);
      const result = await convex.query(api.team.getAllTeams);

      const filesResult = await convex.query(api.file.getFiles, {
        teamId: selectedTeam ?? "",
      });

      // console.log("filesResult", filesResult);

      setTeamsList([...result]);

      setFilesList([...filesResult]);
      setIsLoading(false);
    }

    getTeamsList();
  }, [user, pathname, selectedTeam, createOpen]);

  const progressValue = (filesList.length / 5) * 100;

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
                <span className="">Eraser.io</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
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
                      teamsList?.map((team: Team) => (
                        <SelectItem key={team._id} value={team._id}>
                          <div className="flex flex-1 justify-between items-center ">
                            <Avatar className="mr-2 h-8 w-8 ">
                              <AvatarFallback>
                                {team.teamName[0].toUpperCase() +
                                  team.teamName[1].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {team.teamName}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                      pathname === item.href
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

              <Card x-chunk="dashboard-02-chunk-0">
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
            <ModeToggle />
            <AccountPopover user={user} />
          </header>
          <div className="flex flex-1 flex-col gap-2 p-4 lg:gap-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
