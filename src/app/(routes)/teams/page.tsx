"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import dynamic from "next/dynamic";
import * as React from "react";
import { api } from "../../../../convex/_generated/api";
import useTeams, { TeamsState } from "@/hooks/teams-store";

const TeamsTable = dynamic(() => import("@/shared/teams/teams-table"), {
  ssr: false,
});
type Props = {};

const Teams = (props: Props) => {
  const { teamsList, setTeamsList, isLoading, setIsLoading }: any = useTeams();
  const convex = useConvex();
  const { user } = useKindeBrowserClient();

  React.useEffect(() => {
    async function getTeamsList() {
      setIsLoading(true);
      const result = await convex.query(api.team.getAllTeams);

      setTeamsList([...result]);
      setIsLoading(false);
    }
    if (teamsList.length == 0) {
      getTeamsList();
    }
  }, [user, teamsList, convex]);

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-2xl">Teams</h2>
      </div>
      <div
        //  className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1 p-4 "
      >
        {isLoading && "Loading..."}
        <TeamsTable teamsList={teamsList} />
      </div>
    </main>
  );
};

export default Teams;
