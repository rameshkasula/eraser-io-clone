"use client";

import OrganizationForm from "@/shared/organizations/organization-form";
import * as React from "react";

function Organization() {
  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      {" "}
      organization page
      <OrganizationForm />
    </main>
  );
}

export default Organization;
