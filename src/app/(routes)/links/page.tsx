"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinksTable from "@/shared/links/links-table";

export default function Page() {
  let navItems = [
    {
      value: "Links",
      title: "Links",
      content: <LinksTable />,
    },

    {
      value: "Shop",
      title: "Shop",
      content: <div>Shop</div>,
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-2xl">Links</h2>
      </div>
      <div
        //  className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1 p-4 "
      >
        <Tabs defaultValue="Links" className="w-[700px]">
          <TabsList className="grid w-full grid-cols-2">
            {navItems.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {navItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
