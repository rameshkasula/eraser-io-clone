import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/hooks/users-store";
import { useMessagesStore } from "@/hooks/messages-store";

const notifications = [
  {
    title: "Ramesh",
    description: "1 hour ago",
  },
  {
    title: "Bhaskar",
    description: "1 hour ago",
  },
  {
    title: "Shadcn",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function FriendsList({ className, ...props }: CardProps) {
  const { users } = useUserStore();
  const { currentReceiver, setCurrentReceiver } = useMessagesStore();

  console.log("users", users);
  return (
    <Card className={cn("w-full min-h-screen", className)} {...props}>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1">
          {users?.length > 0 &&
            users.map((user, index) => (
              <div
                onClick={() => {
                  setCurrentReceiver(user);
                }}
                key={user?.id}
                className={cn(
                  "mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 cursor-pointer py-3 ",
                  user?.id === currentReceiver?.id
                    ? "bg-muted/40 border-primary "
                    : ""
                )}
              >
                <Avatar className="h-10 w-10">
                  {user?.picture && (
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  )}
                  <AvatarFallback>
                    {user?.name[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 ml-6 ">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
