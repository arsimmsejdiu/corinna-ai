import { MenuItemProps } from "@/constants/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ActionTooltip } from "../action-tooltip";

const MenuItem = ({
  size,
  path,
  icon,
  label,
  current,
  onSignOut,
}: MenuItemProps) => {
  switch (size) {
    case "max":
      return (
        <ActionTooltip label={label} align="center" side="right">
          <Link
            onClick={onSignOut}
            className={cn(
              "flex items-center gap-2 px-1 py-2 rounded-lg my-1",
              !current
                ? "text-gray-500"
                : current == path
                ? "bg-white font-bold text-black"
                : "text-gray-500"
            )}
            href={path ? `/${path}` : "#"}
          >
            {icon} {label}
          </Link>
        </ActionTooltip>
      );
    case "min":
      return (
        <ActionTooltip label={label} align="center" side="right">
          <Link
            onClick={onSignOut}
            className={cn(
              !current
                ? "text-gray-500"
                : current == path
                ? "bg-white font-bold p-2 transition animate-fade-in text-black"
                : "text-gray-500",
              "rounded-lg py-2 my-1"
            )}
            href={path ? `/${path}` : "#"}
          >
            {icon}
          </Link>
        </ActionTooltip>
      );
    default:
      return null;
  }
};

export default MenuItem;
