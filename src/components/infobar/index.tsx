import React from "react";
import BreadCrumb from "./bread-crumb";
import { Card } from "../ui/card";
import { Headphones, Star, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ActionTooltip } from "../action-tooltip";
import { currentUser } from "@clerk/nextjs";

type Props = {};

const InfoBar = async (props: Props) => {
  const user = await currentUser();

  return (
    <div className="flex w-full justify-between items-center py-1 mb-8 ">
      <BreadCrumb />
      <div className="flex gap-3 items-center">
        <div>
          <Card className="rounded-xl flex gap-3 py-3 px-4 text-ghost">
            <ActionTooltip label="Deleted items" align="center" side="bottom">
              <Trash />
            </ActionTooltip>
            <ActionTooltip label="Starred item" align="center" side="bottom">
              <Star />
            </ActionTooltip>
          </Card>
        </div>
        <Avatar>
          <AvatarFallback className="bg-orange text-white">
            <ActionTooltip label="Support" align="center" side="bottom">
              <Headphones />
            </ActionTooltip>
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <ActionTooltip label={user?.firstName ? user.firstName : "User"} align="center" side="bottom">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </ActionTooltip>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default InfoBar;
