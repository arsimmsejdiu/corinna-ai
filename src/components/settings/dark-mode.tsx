"use client";

import { useThemeMode } from "../../hooks/settings/use-settings";
import Section from "../section-label";
import React from "react";
import { cn } from "../../lib/utils";
import { SystemMode } from "../themes-placeholder/system-mode";
import { LightMode } from "../themes-placeholder/light-mode";
import { DarkMode } from "../themes-placeholder/dark-mode";
import { ActionTooltip } from "../action-tooltip";

type Props = {};

const DarkModeToggle = (props: Props) => {
  const { setTheme, theme } = useThemeMode();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Interface Theme"
          message="Select or customize your UI theme "
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <ActionTooltip label="System" align="center" side="bottom">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "system" && "border-orange"
            )}
            onClick={() => setTheme("system")}
          >
            <SystemMode />
          </div>
        </ActionTooltip>
        <ActionTooltip label="Light" align="center" side="bottom">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "light" && "border-orange"
            )}
            onClick={() => setTheme("light")}
          >
            <LightMode />
          </div>  
        </ActionTooltip>
        <ActionTooltip label="Dark" align="center" side="bottom">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "dark" && "border-orange"
            )}
            onClick={() => setTheme("dark")}
          >
            <DarkMode />
          </div>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default DarkModeToggle;
