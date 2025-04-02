import { useContext } from "react";
import { SidebarContext } from "./SetupSideBar";
import { tv } from "tailwind-variants";

export interface SidebarMenuProps {
  title: string;
  icon?: React.ReactNode;
  id: string;
  children: React.ReactNode;
  isActive?: boolean;
  isComplete?: boolean;
  currStage?: number;
}

export const SetupSidebarMenu: React.FC<SidebarMenuProps> = ({
  title,
  id,
  children,
  isActive,
  isComplete,
  currStage,
}) => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarMenu must be used within a Sidebar");
  }

  const menuItem = tv({
    base: "cursor-pointer w-full mb-2 flex items-center justify-between",
  });

  const getSetupIconForSetupStage = (count: number) => {
    switch (count) {
      case 1:
        return "/assets/SetupFirstStage.svg";
      case 2:
        return "/assets/SetupSecondStage.svg";
      case 3:
        return "/assets/SetupThirdStage.svg";
      case 4:
        return "/assets/SetupFourthStage.svg";
      case 5:
        return "/assets/SetupFifthStage.svg";
      default:
        return "/assets/SetupFifthStage.svg";
    }
  };

  return (
    <div className="mb-6">
      <div key={id} className={menuItem()}>
        <div className="flex flex-1 items-center gap-2 body-2 text-white">
          {isActive && currStage && (
            <span className="text-primary-400">
              <img
                className="transition-all h-6 w-6"
                src={getSetupIconForSetupStage(currStage)}
              />
            </span>
          )}
          {!isActive && (
            <span className="text-primary-400">
              <img
                className="transition-all h-6 w-6"
                src={
                  isComplete
                    ? "/assets/SetupComplete.svg"
                    : "/assets/SetupPending.svg"
                }
              />
            </span>
          )}
          <span
            className={`${isActive && "text-primary-400"} ${isComplete && "text-success-400"}`}
          >
            {title}
          </span>
        </div>
      </div>
      {isActive && <div className="pl-2  mt-4">{children}</div>}
    </div>
  );
};
