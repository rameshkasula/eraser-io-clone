import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

type Props = {
  user: any;
};

const AccountPopover = (props: Props) => {
  const { user } = props;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              {/* <AvatarImage
                      src={user?.picture ?? "https://github.com/shadcn.png"}
                    /> */}
              {user && user.family_name && user.given_name && (
                <AvatarFallback>
                  {user.given_name[0].toUpperCase() +
                    user.family_name[0].toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountPopover;
