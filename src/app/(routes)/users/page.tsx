"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/users-store";

const WorkspaceTable = dynamic(
  () => import("@/shared/workspace/workspace-table"),
  {
    ssr: false,
  }
);

const Users = () => {
  const { users, isLoading, fetchUsers } = useUserStore();
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?.id;

  React.useEffect(() => {
    if (session && userId) {
      // @ts-ignore
      fetchUsers();
    }
  }, [fetchUsers, session, userId]);

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Archive</h1>
      </div>

      <WorkspaceTable isLoading={isLoading} filesList={users} />
    </main>
  );
};

export default Users;
