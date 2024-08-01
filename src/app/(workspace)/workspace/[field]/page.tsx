"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AccountPopover from "@/shared/common/user-profile";
import { ArrowLeftIcon, SaveAllIcon, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";
import { useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import AppLoader from "@/shared/common/app-loader";

const WorkspaceDocument = dynamic(
  () => import("@/shared/workspace/workspace-document"),
  {
    ssr: false,
  }
);

const WorkspaceCanvas = dynamic(
  () => import("@/shared/workspace/workspace-canvas"),
  {
    ssr: false,
  }
);

const WorkSpace = ({
  params,
  searchParams,
}: {
  params: { field: string };
  searchParams: any;
}) => {
  const user = {
    email: searchParams?.get("email"),
    given_name: searchParams?.get("given_name"),
    family_name: searchParams?.get("family_name"),
    picture: searchParams?.get("picture"),
    id: searchParams?.get("id"),
  };
  const [content, setContent] = React.useState(null);
  const [whiteboard, setWhiteboard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const convex = useConvex();

  const getFileData = useCallback(async () => {
    if (params.field) {
      const result = await convex.query(api.file.getFileById, {
        /* @ts-ignore */
        _id: params.field,
      });

      setTimeout(() => {
        if (result?.document) {
          setContent(JSON.parse(result.document));
        }
        if (result?.whiteboard) {
          setWhiteboard(JSON.parse(result.whiteboard));
        }
        setIsLoading(false);
      }, 600);
    }
  }, [convex, params.field]);

  const updateDocument = useMutation(api.file.updateFileDoc);
  const updateWhiteboard = useMutation(api.file.updateFileWhiteboard);

  const handleSave = useCallback(async () => {
    if (!params.field) {
      return;
    }

    try {
      if (content) {
        await updateDocument({
          /* @ts-ignore */

          _id: params.field,
          document: JSON.stringify(content),
        });
      }

      if (whiteboard) {
        await updateWhiteboard({
          /* @ts-ignore */

          _id: params.field,
          whiteboard: JSON.stringify(whiteboard),
        });
      }

      toast.success("File saved");
    } catch (error) {
      console.error("Error saving file:", error);
      toast.error("Failed to save file");
    }
  }, [content, params.field, updateDocument, updateWhiteboard, whiteboard]);

  React.useEffect(() => {
    if (params.field) {
      setIsLoading(true);
      getFileData();
    }

    return () => {};
  }, [getFileData, params.field]);

  const holderName = "editor_create";

  return (
    <React.Suspense
      fallback={
        <AppLoader text="Loading workspace..." className="min-h-screen" />
      }
    >
      <div className="min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <header className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mx-40 my-3">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="">{searchParams?.title}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSave}>
              <SaveAllIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
            <ModeToggle />
            <AccountPopover user={user} />
          </div>
        </header>
        <Separator />

        <main className="p-4 md:p-6 lg:p-8 lg:mx-40 md:mx-30">
          {isLoading && (
            <div className="flex justify-center items-center min-h-screen ">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          )}
          {!isLoading && params.field && (
            <main className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-screen">
                <WorkspaceDocument
                  data={content}
                  onChange={setContent}
                  holder={holderName}
                />
              </div>
              <div className="min-h-screen border-l">
                <WorkspaceCanvas data={whiteboard} onChange={setWhiteboard} />
              </div>
            </main>
          )}
        </main>
      </div>
    </React.Suspense>
  );
};

export default WorkSpace;
