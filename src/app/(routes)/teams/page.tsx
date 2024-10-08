"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import useTeams, { TeamsState } from "@/hooks/teams-store";

const TeamsTable = dynamic(() => import("@/shared/teams/teams-table"), {
  ssr: false,
});
type Props = {};

const Teams = (props: Props) => {
  const { teamsList, isLoading }: any = useTeams();

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-2xl">Teams</h2>
      </div>
      <div
        //  className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1 p-4 "
      >
        <TeamsTable isLoading={isLoading} teamsList={teamsList} />
      </div>
    </main>
  );
};

export default Teams;
