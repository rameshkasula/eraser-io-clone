"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppCommand from "@/shared/common/app-command";
import AccountPopover from "@/shared/common/user-profile";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  ArrowLeftIcon,
  CopyIcon,
  Link2Icon,
  MoveLeft,
  Package2,
  SaveAllIcon,
  Share2,
  Share2Icon,
} from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

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

const WorkSpace = ({ params }: { params: { field: string } }) => {
  const { user } = useKindeBrowserClient();
  const [content, setContent] = React.useState(null);
  const [whiteboard, setWhiteboard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const convex = useConvex();

  const router = useRouter();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Add a toast notification or other feedback to indicate the link has been copied
  };

  const getFileData = async () => {
    setIsLoading(true);
    const result = await convex.query(api.file.getFileById, {
      _id: params.field || "",
    });

    setWhiteboard(JSON.parse(result?.whiteboard));
    const parsedResult = JSON.parse(result?.document);
    setContent(parsedResult);

    setIsLoading(false);
  };
  const updateDocument = useMutation(api.file.updateFileDoc);
  const updateWhiteboard = useMutation(api.file.updateFileWhiteboard);

  const handleSave = async () => {
    if (!params.field) {
      return;
    }

    // console.log("content", content);
    // console.log("whiteboard", whiteboard);
    try {
      let docResult, whiteboardResult;
      if (content) {
        docResult = await updateDocument({
          _id: params.field || "",
          document: JSON.stringify(content),
        });
      }

      if (whiteboard) {
        whiteboardResult = await updateWhiteboard({
          _id: params.field || "",
          whiteboard: JSON.stringify(whiteboard),
        });
      }

      // console.log(docResult, whiteboardResult);

      toast.success("File saved");

      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to save file");
    }
  };

  React.useEffect(() => {
    if (params.field) {
      getFileData();
    }
  }, [params]);

  const holderName = "editor_create";

  return (
    <div className="min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <header className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mx-40 my-3">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <Package2 className="h-6 w-6" />
            <span className="">Eraser.io</span>
          </Link>
          <div className="min-w-full px-5">
            <AppCommand />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden lg:flex"
            onClick={handleCopyLink}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Copy link</span>
          </Button>
          <Button variant="outline" onClick={() => handleSave()}>
            <SaveAllIcon className="h-4 w-4 mr-2 " />
            Save
          </Button>
          <ModeToggle />
          <AccountPopover user={user} />
        </div>
      </header>
      <Separator />

      <main className="p-4 md:p-6 lg:p-8 lg:mx-40 md:mx-30 ">
        <main className="grid grid-cols-1 md:grid-cols-2">
          <div className=" h-screen">
            {!isLoading && content && params.field && holderName && (
              <WorkspaceDocument
                data={content}
                onChange={(e: any) => setContent(e)}
                holder={holderName}
              />
            )}
          </div>
          <div className="min-h-screen border-l">
            {!isLoading && params.field && (
              <WorkspaceCanvas
                data={whiteboard}
                onChange={(e: any) => setWhiteboard(e)}
              />
            )}
          </div>
        </main>
      </main>
    </div>
  );
};

export default WorkSpace;
