"use client";
import * as React from "react";
import { Copy, PlusIcon } from "lucide-react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useFileStore } from "@/hooks/files-store";
import { useSession } from "next-auth/react";
import { ENV_VARIABLES } from "@/utils/constants";

export default function CreateFile() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [fileName, setFileName] = React.useState("");

  const { data: session } = useSession();

  // files store
  const { isFileOpen, setIsFileOpen, createFile, files, fetchFiles } =
    useFileStore();

  const handleCreateFile = () => {
    if (fileName === "") {
      setShowAlert(true);
      toast.warning("Please enter a file name");
    } else {
      // @ts-ignore

      fetchFiles({ params: { userId: session?.user?.id } });

      if (
        files.length == Number(ENV_VARIABLES.freeLimit) ||
        files.length > Number(ENV_VARIABLES.freeLimit)
      ) {
        setIsFileOpen(false);
        toast.error("You have reached your free limit");
        return;
      } else {
        let payload = {
          name: fileName, // @ts-ignore
          userId: session?.user?.id, // @ts-ignore
          createdBy: session?.user?.id,
        };
        createFile(payload)
          .then((res) => {
            console.log("res", res);
            console.log("Available files", files);

            setFileName("");
            setIsFileOpen(false);
            toast.success("File created successfully");
          })
          .catch((error) => {
            console.log("error", error);
            toast.error(error.message);
          });
      }
    }
  };
  return (
    <Dialog open={isFileOpen} onOpenChange={() => setIsFileOpen(!isFileOpen)}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full"
          onClick={() => setIsFileOpen(!isFileOpen)}
          variant="outline"
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Create File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-screen ">
        <DialogHeader>
          <DialogTitle>Create File</DialogTitle>
          <DialogDescription>
            Create a new file in the current directory.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 w-full ">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              File Name
            </Label>
            <Input
              id="link"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Example: new alogrithm"
              className="w-full"
            />
          </div>
        </div>
        {showAlert && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              File name cannot be empty, please enter a file name.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter className="sm:justify-end">
          <Button onClick={handleCreateFile} type="button" variant="secondary">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
