"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

let navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 max-w-screen-xl mx-auto px-4">
      <h1 className="text-xl font-bold">Kasz.io</h1>

      {/* <nav className="flex flex-1 items-center justify-end md:justify-between px-6 ">
        <ul className="flex items-center gap-6 text-sm ">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:underline  ">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}
      <div className="flex items-center gap-6">
        <Link href={"/auth/sign-in"}>
          <Button variant="default" className="px-4 text-white ">
            Login
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="px-2 border-primary ">
            Try Eraser <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
