"use client";

import * as React from "react";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DashboardTable from "@/shared/dashboard/dashboard-table";
import useTeams from "@/hooks/teams-store";
type Props = {};

const DashboardPage = (props: Props) => {
  const { filesList, isLoading }: any = useTeams();

  const convex = useConvex();

  let user = {
    email: "",
    given_name: "",
    family_name: "",
    picture: "",
  };

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

      <DashboardTable isLoading={isLoading} filesList={filesList} />
    </main>
  );
};

export default DashboardPage;
