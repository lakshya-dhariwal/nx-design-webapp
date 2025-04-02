import { useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { SidebarContext } from "./DashboardSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { tv } from "tailwind-variants";

export interface SidebarMenuProps {
  title: string;
  icon?: React.ReactNode;
  id: string;
  children: React.ReactNode;
  isActive?: boolean;
  currStage?: number;
  expanded?: boolean;
  admin?: boolean;
}

export const DashboardSidebarMenu: React.FC<SidebarMenuProps> = ({
  title,
  icon,
  id,
  children,
  expanded,
  admin,
}) => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarMenu must be used within a Sidebar");
  }
  const { expandedItemId, toggleItem } = context;

  const isExpanded = expanded || expandedItemId === id;

  const menuItem = tv({
    base: "cursor-pointer w-full mb-2 flex items-center justify-between border-b border-white/50 pb-3 text-white",
  });

  // Animation variants for the children content
  const childrenVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for the icon
  const iconVariants = {
    collapsed: {
      rotate: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    expanded: {
      rotate: 180,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="pb-3 px-2">
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className={` ${admin ? " border-primary-400  border-t-2 pt-2" : "border-transparent rounded-lg"}`}
      >
        <div key={id} className={menuItem()} onClick={() => toggleItem(id)}>
          <motion.div
            className="flex flex-1 items-center gap-2 body-2"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon && (
              <motion.span
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.span>
            )}
            <span>{title}</span>
          </motion.div>
          <motion.div
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={iconVariants}
          >
            <IoIosArrowDown className="text-white w-6 h-6 flex-shrink-0" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key={`${id}-children`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={childrenVariants}
            className="pl-2 space-y-3 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                staggerChildren: 0.1,
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
