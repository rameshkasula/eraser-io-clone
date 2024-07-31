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
    <div className={cn("flex justify-center items-center", className)}>
      <Loader2 className="h-10 w-10 animate-spin" />
      {text && (
        <span className="font-semibold text-lg text-primary ">{text}</span>
      )}
    </div>
  );
}
