"use server";

import { client } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const onToggleRealTime = async (id: string, state: boolean) => {
  try {
    const chatRoom = await client.chatRoom.update({
      where: {
        id: id,
      },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    });

    if (chatRoom) {
      return {
        status: 200,
        message: chatRoom.live
          ? "Real time mode enabled"
          : "Real time mode disabled",
        chatRoom,
      };
    }
  } catch (error) {
    console.log("[ON_TOGGLE_REAL_TIME] -> ", error);
  }
};

export const onGetConversationMode = async (id: string) => {
  try {
    const mode = await client.chatRoom.findUnique({
      where: {
        id: id,
      },
      select: {
        live: true,
      },
    });

    console.log("Conversation Mode -> ", mode);
    return mode;
  } catch (error) {
    console.log("[ON_GET_CONVERSATION_MODE]", error);
  }
};

export const onGetDomainChatRooms = async (id: string) => {
  try {
    const domains = await client.domain.findUnique({
      where: {
        id: id,
      },
      select: {
        customer: {
          select: {
            email: true,
            chatRoom: {
              select: {
                createdAt: true,
                id: true,
                message: {
                  select: {
                    message: true,
                    createdAt: true,
                    seen: true,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (domains) {
      return domains;
    }
  } catch (error) {
    console.log("[ON_GET_DOMAIN_CHAT_ROOMS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onGetChatMessages = async (id: string) => {
  try {
    const messages = await client.chatRoom.findMany({
      where: {
        id,
      },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (messages) {
      return messages;
    }
  } catch (error) {
    console.log("[ON_GET_CHAT_MESSAGE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onViewUnReadMessages = async (id: string) => {
  try {
    await client.chatMessage.updateMany({
      where: {
        chatRoomId: id,
      },
      data: {
        seen: true,
      },
    });
  } catch (error) {
    console.log("[ON_VIEW_UN_READ_MESSANGES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onRealTimeChat = async (
  chatroomId: string,
  message: string,
  id: string,
  role: "assistant" | "user"
) => {
  // pusherServer.trigger(chatroomId, 'realtime-mode', {
  //   chat: {
  //     message,
  //     id,
  //     role,
  //   },
  // })
};

export const onOwnerSendMessage = async (
  chatroom: string,
  message: string,
  role: "assistant" | "user"
) => {
  try {
    const chat = await client.chatRoom.update({
      where: {
        id: chatroom,
      },
      data: {
        message: {
          create: {
            message,
            role,
          },
        },
      },
      select: {
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (chat) {
      return chat;
    }
  } catch (error) {
    console.log("[ON_OWNER_SEND_MESSAGE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
