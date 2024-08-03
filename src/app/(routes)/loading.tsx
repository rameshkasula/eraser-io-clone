"use client";

import React from "react";
import dynamic from "next/dynamic";
const AppLoader = dynamic(() => import("@/shared/common/app-loader"), {
  ssr: false,
});

function loading() {
  return (
    <main>
      <AppLoader text="Loading..." className="min-h-screen" />
    </main>
  );
}

export default loading;
