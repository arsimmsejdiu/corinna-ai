"use client";

import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useChatContext } from "./user-chat-context";
import {
  onGetConversationMode,
  onToggleRealTime,
} from "@/actions/conversation";
import { useClerk } from "@clerk/nextjs";

const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatRoom } = useChatContext();

  const onActiveRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealTime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );

      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast({
          title: "Success",
          description: realtime.message,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom, onGetCurrentMode]);

  const page = pathname.split("/").pop();
  const { signOut } = useClerk();

  const onSignOut = () => signOut(() => router.push("/"));
  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActiveRealtime,
    chatRoom,
    loading,
  };
};

export default useSideBar;
