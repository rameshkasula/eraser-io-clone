"use client";

import * as React from "react";
import DashboardTable from "@/shared/dashboard/dashboard-table";
import useTeams from "@/hooks/teams-store";
type Props = {};

const WorkSpace = (props: Props) => {
  const { filesList, isLoading }: any = useTeams();

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Documents</h1>
      </div>

      <DashboardTable isLoading={isLoading} filesList={filesList} />
    </main>
  );
};

export default WorkSpace;
