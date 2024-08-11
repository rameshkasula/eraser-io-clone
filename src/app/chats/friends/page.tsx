"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  CornerDownLeft,
  Mic,
  Paperclip,
  PhoneCallIcon,
  VideoIcon,
} from "lucide-react";
import moment from "moment";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useMessagesStore } from "@/hooks/messages-store";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import MessageBubble from "@/shared/chats/message-bubble";

const FriendsList = dynamic(() => import("@/shared/chats/friends-list"), {
  ssr: false,
});

export default function FriendsPage() {
  const { data: session } = useSession();
  const { currentReceiver, messages, addMessage } = useMessagesStore();
  const [message, setMessage] = React.useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    let payload = {
      id: Math.random(),
      message,
      receiverId: currentReceiver?.id,
      createdTime: new Date(),
      senderId: session?.user?.id,
    };
    addMessage(payload);
    setMessage("");
  };

  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="relative hidden flex-col items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <FriendsList />
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semiboldt" x-chunk="dashboard-03-chunk-0">
            {currentReceiver?.name}
          </h2>

          <div
            x-chunk="dashboard-03-chunk-0"
            className="flex items-center gap-2"
          >
            <Button variant="outline" size="icon">
              <PhoneCallIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <VideoIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex max-h-[70vh] flex-col gap-4 overflow-auto">
            {messages?.length > 0 &&
              messages.map((item) => (
                <MessageBubble
                  key={item.id}
                  item={item}
                  session={session}
                  currentReceiver={currentReceiver}
                />
              ))}
          </div>
        </div>
        <form
          onSubmit={handleSendMessage}
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          x-chunk="dashboard-03-chunk-1"
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
