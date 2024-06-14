"use client";
import { useConversation } from "../../hooks/conversation/use-conversation";
import React from "react";
import TabsMenu from "../tabs";
import { TABS_MENU } from "../../constants/menu";
import { TabsContent } from "../ui/tabs";
import ConversationSearch from "./search";
import { Loader } from "../loader";
import ChatCard from "./chat-card";
import { CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import TabDescription from "./tab-description";

type Props = {
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation();

  return (
    <div className="p-5">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread">
          <ConversationSearch domains={domains} register={register} />
          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription>No chats for you domain</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <Separator orientation="horizontal" className="mt-5" />
          <TabDescription loading={loading} description="All messages" />
        </TabsContent>
        <TabsContent value="expired">
          <Separator orientation="horizontal" className="mt-5" />
          <TabDescription loading={loading} description="Expired messages" />
        </TabsContent>
        <TabsContent value="starred">
          <Separator orientation="horizontal" className="mt-5" />
          <TabDescription loading={loading} description="Starred messages" />
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default ConversationMenu;
