import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabsProps } from "@/constants/types";

const TabsMenu = ({ triggers, children, className, button }: TabsProps) => {
  return (
    <Tabs defaultValue={triggers[0].label}>
      <TabsList className={cn("pr-5", className)}>
        {triggers.map((trigger, key) => (
          <TabsTrigger
            key={key}
            value={trigger.label}
            className="capitalize flex gap-2 font-semibold"
          >
            {trigger.icon && trigger.icon}
            {trigger.label}
          </TabsTrigger>
        ))}
        {button}
      </TabsList>
      {children}
    </Tabs>
  );
};
