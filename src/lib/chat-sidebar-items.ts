import { Users, MessageSquare } from "lucide-react";

export const chatSidebarItems = [
  {
    name: "Chats",
    href: "/chats",
    icon: MessageSquare,
  },
  {
    name: "Friends",
    href: "/chats/friends",
    icon: Users,
    badge: 6,
  },
];
