import { useContext } from "react";
import { SidebarContext } from "./SetupSideBar";
import { tv } from "tailwind-variants";

export interface SidebarItemProps {
  isActive: boolean;
  onClick?: () => void;
  title: string;
  icon?: React.ReactNode;
  isComplete?: boolean;
  lastItem?: boolean;
}

export const SetupSidebarItem: React.FC<SidebarItemProps> = ({
  title,
  isActive,
  isComplete,
  onClick,
}) => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }
  const getIconForSidebarItem = () => {
    if (isComplete) {
      return "/assets/SetupComplete.svg";
    } else if (isActive) {
      return "/assets/SetupDots.svg";
    } else {
      return "/assets/SetupPending.svg";
    }
  };

  const navItemVariants = tv({
    base: "p-3 rounded-lg transition-all ease-in-out duration-150 text-white flex flex-row items-center space-x-3 min-w-[157px]",
    variants: {
      isActive: {
        true: "bg-primary-400",
        false: isComplete ? "opacity-100" : "opacity-60",
      },
    },
  });

  return (
    <div className="">
      <div
        onClick={onClick}
        className={navItemVariants({ isActive: isActive })}
      >
        <img src={getIconForSidebarItem()} alt="icon" />
        <span className={`body-2 ${isComplete && "text-success-600"}`}>
          {title}
        </span>
      </div>
    </div>
  );
};
