"use client";

import { Button } from "@/components/ui/button";

import { ArrowLeftIcon, SaveAllIcon, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";
import { useCallback } from "react";

import { toast } from "sonner";
import AppLoader from "@/shared/common/app-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFileStore } from "@/hooks/files-store";
import { useSession } from "next-auth/react";

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
  const [content, setContent] = React.useState(null);
  const [whiteboard, setWhiteboard] = React.useState(null);

  const { isLoading, getFile, file, updateFile } = useFileStore();

  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?.id;

  const handleSave = useCallback(async () => {
    if (!params.field) {
      return;
    }

    try {
      // Await the updateFile call to ensure it completes before proceeding
      // @ts-ignore
      await updateFile({
        // @ts-ignore
        id: params.field, // Assuming params.field is the correct ID
        // @ts-ignore
        content: content,
        // @ts-ignore
        whiteboard: whiteboard,
      });

      toast.success("File saved successfully");
    } catch (error) {
      console.error("Error saving file:", error); // Use console.error for better error logging

      // Handle the error as needed
      // @ts-ignore
      toast.error(error.message || "Error saving file");
    }
  }, [content, params.field, whiteboard, updateFile]); // Make sure updateFile is included in the dependencies

  React.useEffect(() => {
    if (params.field) {
      // @ts-ignore
      getFile({
        params: {
          // @ts-ignore
          fileId: params.field,
          userId: userId,
        },
      });
    }

    return () => {};
  }, [params.field]);

  React.useEffect(() => {
    if (params.field && file) {
      setContent(file.content);
      setWhiteboard(file.whiteboard);
    }
  }, [file, params.field]);

  const holderName = "editor_create";

  return (
    <React.Suspense
      fallback={
        <AppLoader text="Loading workspace..." className="min-h-screen" />
      }
    >
      <Card className="w-full">
        <CardHeader className="flex-row  items-center justify-between max-w-full max-h-5 ">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 " />
            <CardTitle className="text-md font-medium">{file?.name}</CardTitle>
          </div>

          {!isLoading && (
            <Button variant="default" className="px-4" onClick={handleSave}>
              <SaveAllIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading && (
            <AppLoader text="Loading workspace..." className="min-h-screen" />
          )}
          {!isLoading && params.field && file && (
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
        </CardContent>
      </Card>
      <div className="min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* <header className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mx-40 ">
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
            {session?.user && <AccountPopover user={session?.user} />}
          </div>
        </header> */}
        {/* <Separator /> */}
      </div>
    </React.Suspense>
  );
};

export default WorkSpace;
