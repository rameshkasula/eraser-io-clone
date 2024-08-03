import {
  CreditCard,
  LayoutGrid,
  ShoppingCart,
  Users,
  ChartPie,
  StoreIcon,
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
  console.log("role", role);

  switch (role) {
    case "ADMIN":
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
    default:
      return [];
  }
};
