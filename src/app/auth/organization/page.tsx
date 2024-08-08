"use client";

import OrganizationForm from "@/shared/organizations/organization-form";
import { Handshake } from "lucide-react";
import * as React from "react";

function Organization() {
  return (
    <main className="min-h-screen">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        {/* Center the Handshake icon in the grid */}
        <div className="flex flex-col items-center justify-center min-w-full col-span-1">
          <h2 className="text-2xl font-bold text-center ">
            Setup Organization
          </h2>
          <Handshake className="h-40 w-40 text-primary " />
        </div>

        {/* Organization Form */}
        <div className="flex items-center justify-center py-12">
          <OrganizationForm />
        </div>
      </div>
    </main>
  );
}

export default Organization;
