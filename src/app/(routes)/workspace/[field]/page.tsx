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
import EditorBlock from "@/shared/workspace/workspace-document";

// const WorkspaceDocument = dynamic(
//   () => import("@/shared/workspace/workspace-document"),
//   {
//     ssr: false,
//   }
// );

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

  const handleContentChange = (data: any) => {
    // Do something with the data
    setContent(data);
  };

  console.log("ffffffffff", file);

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
            onClick={() => {
              window.history.back();
              setContent(null);
            }}
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
          {!isLoading && params.field && (
            <main className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto scroll-smooth  ">
              <div className="h-screen">
                <EditorBlock
                  data={content}
                  onChange={handleContentChange}
                  holder="editor_app"
                />
              </div>
              {/* <div className="min-h-screen border-l">
                <WorkspaceCanvas data={whiteboard} onChange={setWhiteboard} />
              </div> */}
            </main>
          )}
        </CardContent>
      </Card>
    </React.Suspense>
  );
};

export default WorkSpace;
