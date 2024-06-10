import { SIDE_BAR_MENU } from "@/constants/menu";
import { MinMenuProps } from "@/constants/types";
import { LogOut, MonitorSmartphone } from "lucide-react";
import { MenuLogo } from "@/icons/menu-icon";
import MenuItem from "./menu-item";
import DomainMenu from "./domain-menu";

export const MinMenu: React.FC<MinMenuProps> = ({
  onShrink,
  current,
  onSignOut,
  domains,
}) => {
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span className="animate-fade-in opacity-0 delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogo onClick={onShrink} />
      </span>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <DomainMenu min domains={domains} />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign Out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="min"
            label="Mobile App"
            icon={<MonitorSmartphone />}
          />
        </div>
      </div>
    </div>
  );
};
