"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useFileStore } from "@/hooks/files-store";
import { useSession } from "next-auth/react";

const WorkspaceTable = dynamic(
  () => import("@/shared/workspace/workspace-table"),
  {
    ssr: false,
  }
);

const WorkSpace = () => {
  const { files, isLoading, fetchFiles } = useFileStore();
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?.id;

  React.useEffect(() => {
    if (session && userId) {
      // @ts-ignore
      fetchFiles({
        params: {
          // @ts-ignore
          userId: userId,
        },
      });
    }
  }, [fetchFiles, session, userId]);

  return (
    <main className="flex flex-1 flex-col gap-2  lg:gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Archive</h1>
      </div>

      <WorkspaceTable isLoading={isLoading} filesList={files} />
    </main>
  );
};

export default WorkSpace;
