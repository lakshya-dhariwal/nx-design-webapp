// Sidebar.tsx
import React, { createContext, useState } from "react";
import { tv } from "tailwind-variants";

type SidebarProps = {
  children: React.ReactNode;
  support?: React.ReactNode;
  className?: string;
  logout?: React.ReactNode;
  companyBadge?: {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    logo: React.ReactNode;
  };
};

interface SidebarContextType {
  expandedItemId: string | null;
  setExpandedItemId: (id: string | null) => void;
  toggleItem: (id: string) => void;
}

/**
 * This sidebar component is used to display the sidebar menu in the dashboard and setup pages.
 * .
 */
export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export const SetupSidebar: React.FC<SidebarProps> = ({
  children,
  className,
  companyBadge,
  logout,
  support,
}) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  const mableLogo = tv({
    base: "h-8 mb-8 min-h-fit",
  });

  const sidebar = tv({
    base: "p-6 h-screen w-[230px] border-r border-white/40 flex-shrink-0 flex flex-col justify-between",
  });

  return (
    <SidebarContext.Provider
      value={{ expandedItemId, setExpandedItemId, toggleItem }}
    >
      <aside className={sidebar() + " " + className}>
        <div className="h-[90%]  overflow-y-hidden">
          <img className={mableLogo()} src="/MableLogo.svg"></img>
          <nav className="h-full  flex flex-col justify-start w-full overflow-y-scroll">
            {children}
          </nav>
        </div>
        <div className="w-full flex flex-col justify-end h-[10%] min-h-fit p-3">
          {logout && logout}
          {companyBadge && <CompanyBadge {...companyBadge} />}
          {support && support}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

const CompanyBadge: React.FC<{
  title: React.ReactNode;
  subtitle: React.ReactNode;
  logo: React.ReactNode;
}> = ({ title, subtitle, logo }) => {
  return (
    <div
      className={
        "h-auto w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-3"
      }
    >
      <div className="w-11 h-11">{logo}</div>
      <div className="mt-2">
        <h1 className=" body-3 text-white">{title}</h1>
        <h2 className="body-3 text-white/50 mt-1 font-normal">{subtitle}</h2>
      </div>
    </div>
  );
};
