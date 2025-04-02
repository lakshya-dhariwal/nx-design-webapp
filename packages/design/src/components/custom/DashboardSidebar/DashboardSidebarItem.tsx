import { useContext } from "react";
import { SidebarContext } from "./DashboardSidebar";
import { tv } from "tailwind-variants";

export interface SidebarItemProps {
  isActive: boolean;
  onClick?: () => void;
  title: string;
  icon?: React.ReactNode;
  lastItem?: boolean;
}

export const DashboardSidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  isActive,
  onClick,
}) => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }

  const navItemVariants = tv({
    base: "p-3 rounded-lg transition-all ease-in-out duration-200 text-white flex flex-row items-center space-x-3 min-w-[157px] cursor-pointer",
    variants: {
      isActive: {
        true: "bg-primary-400",
        false: "opacity-60",
      },
    },
  });

  return (
    <div className="">
      <div
        onClick={onClick}
        className={navItemVariants({ isActive: isActive })}
      >
        {icon && <span className="text-white">{icon}</span>}
        <span className={`body-2 `}>{title}</span>
      </div>
    </div>
  );
};
