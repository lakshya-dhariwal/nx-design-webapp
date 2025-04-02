import React, { createContext, useState } from "react";
import { tv } from "tailwind-variants";
import CompanyBadge from "../CompanyBadge";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CompanyBadgeType } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type SidebarProps = {
  secondaryView: boolean;
  toggleSecondaryView: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  admin?: React.ReactNode;
  companyBadge?: Omit<CompanyBadgeType, "setSecondaryViewState">;
  logout?: () => void;
};

interface SidebarContextType {
  expandedItemId: string | null;
  setExpandedItemId: (id: string | null) => void;
  toggleItem: (id: string) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

const styles = {
  sidebar: tv({
    base: "p-6 h-screen w-[230px] border-r border-white/40 flex-shrink-0 flex flex-col justify-between",
    variants: { type: { dashboard: "", setup: "" } },
    defaultVariants: { type: "dashboard" },
  }),
  logo: tv({ base: "h-8 mb-4" }),
  backButton:
    "text-white body-4 flex items-center gap-2 cursor-pointer py-3 mb-3 border-b border-white/60",
} as const;

const animations = {
  layout: { duration: 0.2, ease: "easeOut" },
  fadeSlide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: 0.2 },
  },
} as const;

export const DashboardSidebar: React.FC<SidebarProps> = ({
  children,
  className,
  companyBadge,
  admin,
  secondaryView,
  toggleSecondaryView,
  logout,
}) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <SidebarContext.Provider
      value={{ expandedItemId, setExpandedItemId, toggleItem }}
    >
      <motion.aside
        className={`${styles.sidebar()} ${className}`}
        layout
        transition={animations.layout}
      >
        <motion.div className="h-auto overflow-y-scroll" layout>
          <motion.img className={styles.logo()} src="/MableLogo.svg" layout />

          <AnimatePresence mode="wait">
            {secondaryView && (
              <motion.div
                {...animations.fadeSlide}
                className={styles.backButton}
                onClick={(e) => toggleSecondaryView(e)}
              >
                <FaArrowLeftLong /> Go Back
              </motion.div>
            )}
          </AnimatePresence>

          <motion.nav
            className="h-auto w-full overflow-y-auto"
            layout="position"
          >
            {children}
          </motion.nav>
        </motion.div>

        <motion.div layout>
          {admin}
          {companyBadge && <CompanyBadge {...companyBadge} logout={logout} />}
        </motion.div>
      </motion.aside>
    </SidebarContext.Provider>
  );
};
