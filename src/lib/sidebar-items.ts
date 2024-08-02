import {
  CreditCard,
  LayoutGrid,
  ShoppingCart,
  Users,
  ChartPie,
} from "lucide-react";

export const sidebarItems = [
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartPie,
  },
  {
    name: "Workspace",
    href: "/workspace",
    icon: LayoutGrid,
  },
  {
    name: "Teams",
    href: "/teams",
    icon: Users,
    badge: 6,
  },
  {
    name: "Subscription",
    href: "/subscription",
    icon: CreditCard,
  },
];
