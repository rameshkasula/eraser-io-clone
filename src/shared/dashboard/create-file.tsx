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
import useTeams from "@/hooks/teams-store";
import { toast } from "sonner";

export default function CreateFile() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const { selectedTeam, createOpen, setCreateOpen }: any = useTeams();

  const handleCreateFile = () => {
    if (fileName === "") {
      setShowAlert(true);
    } else {
      console.log("create file", fileName);
    }
  };
  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full mb-2"
          onClick={() => setCreateOpen(true)}
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
