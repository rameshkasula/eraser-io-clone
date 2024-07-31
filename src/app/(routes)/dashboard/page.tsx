"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import * as React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DataTable from "@/shared/common/data-table";
import DashboardTable from "@/shared/dashboard/dashboard-table";
import useTeams from "@/hooks/teams-store";
type Props = {};

const DashboardPage = (props: Props) => {
  const { filesList }: any = useTeams();
  const { user } = useKindeBrowserClient();
  const convex = useConvex();

  const createUser = useMutation(api.user.createUser);

  async function checkUser() {
    const result = await convex.query(api.user.getUser, {
      email: user?.email ?? "",
    });
    if (!result?.length) {
      createUser({
        email: user?.email ?? "",
        firstName: user?.given_name ?? "",
        lastName: user?.family_name ?? "",
        image: user?.picture ?? "",
      })
        .then((res) => console.log("res", res))
        .catch((err) => console.log("err", err));
    }
  }
  React.useEffect(() => {
    if (user?.email) {
      checkUser();
    }
  }, [user]);

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Documents</h1>
      </div>

      <DashboardTable filesList={filesList} />
    </main>
  );
};

export default DashboardPage;
