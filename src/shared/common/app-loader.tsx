"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

export default function AppLoader({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center  gapy-y-2 ",
        className ? className : "min-h-screen/2"
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary " />
      {text && (
        <span className="font-semibold text-lg text-primary ">{text}</span>
      )}
    </div>
  );
}
