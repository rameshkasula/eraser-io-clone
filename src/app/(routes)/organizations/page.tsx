"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import useTeams, { TeamsState } from "@/hooks/teams-store";
import { useOrganizationsStore } from "@/hooks/organizations-store";

const OrganizationTable = dynamic(
  () => import("@/shared/organizations/organization-table"),
  {
    ssr: false,
  }
);
type Props = {};

const Teams = (props: Props) => {
  const getOrganizations = useOrganizationsStore(
    (state) => state.getOrganizations
  );

  const { isLoading, organizations } = useOrganizationsStore();

  React.useEffect(() => {
    getOrganizations();
  }, [getOrganizations]);
  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-2xl">Organizations</h2>
      </div>
      <div
        //  className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1 p-4 "
      >
        <OrganizationTable isLoading={isLoading} teamsList={organizations} />
      </div>
    </main>
  );
};

export default Teams;
