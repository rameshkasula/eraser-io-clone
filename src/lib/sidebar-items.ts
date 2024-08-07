import {
  CreditCard,
  LayoutGrid,
  ShoppingCart,
  Users,
  ChartPie,
  StoreIcon,
  Archive,
  Settings2,
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

export const roleBasedItems = (role: string) => {
  // console.log("role", role);

  switch (role) {
    case "ADMIN":
      return [
        {
          name: "Analytics",
          href: "/analytics",
          icon: ChartPie,
        },
        {
          name: "Users",
          href: "/users",
          icon: Users,
        },
        {
          name: "Workspace",
          href: "/workspace",
          icon: LayoutGrid,
        },
        {
          name: "Organizations",
          href: "/organizations",
          icon: StoreIcon,
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
    case "BUSINESS":
      return [
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
    case "PERSONAL":
      return [
        {
          name: "Workspace",
          href: "/workspace",
          icon: LayoutGrid,
        },
        {
          name: "Archive",
          href: "/archive",
          icon: Archive,
          badge: 6,
        },
        {
          name: "Subscription",
          href: "/subscription",
          icon: CreditCard,
        },
        {
          name: "Settings",
          href: "/settings",
          icon: Settings2,
        },
      ];
    default:
      return [];
  }
};
