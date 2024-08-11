import moment from "moment"; // Ensure moment is imported if not already
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  item: any;
  session: any;
  currentReceiver: any;
}

const MessageBubble = ({
  item,
  session,
  currentReceiver,
}: MessageBubbleProps) => {
  const isSender = item?.senderId === session?.user?.id;
  const isReceiver = item?.senderId === currentReceiver?.id;

  return (
    <div
      className={cn(
        "my-1 bg-muted/50 p-3 text-sm max-w-52 rounded-lg",
        isSender && "float-right bg-primary",
        isReceiver && "float-left"
      )}
      key={item?.id}
    >
      <h2 className="font-semibold text-white">{item?.message}</h2>
      <p className="text-xs text-muted-foreground mt-2 ml-3">
        {moment(item?.createdTime).fromNow() || item?.createdTime}
      </p>
    </div>
  );
};

export default MessageBubble;
