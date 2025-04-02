import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { CompanyBadgeType } from "../../../types";
import { FiLogOut } from "react-icons/fi";

const CompanyBadge = ({
  title,
  subtitle,
  logo,
  menu,
  onClick,
  logout,
}: CompanyBadgeType) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="w-full relative">
      <div className="h-auto w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-3">
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 flex-shrink-0">{logo}</div>

          <motion.button type="button" onClick={() => setIsOpen(!isOpen)}>
            <GoKebabHorizontal className="h-5 w-5 text-white transform rotate-90 flex-shrink-0 cursor-pointer" />
          </motion.button>
        </div>
        <div className="flex items-end justify-between mt-2">
          <div className="max-w-[180px]">
            <h1 className="body-3 text-white">{title}</h1>
            <h2 className="body-3 text-white/50 mt-1 font-normal">
              {subtitle}
            </h2>
          </div>
          {logout && (
            <div className="flex items-center gap-2">
              <FiLogOut
                onClick={logout}
                className="h-5 w-5 text-red-500 flex-shrink-0 cursor-pointer transform rotate-180"
              />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="absolute top-1 left-full ml-2 bg-card-background bg-opacity-10 backdrop-blur-lg 
                         rounded-lg rounded-tl-none shadow-lg border border-white/10 min-w-[180px] z-[60]"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              {menu.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={menuItemVariants}
                  className={`py-2.5 text-white cursor-pointer body-5 
                            first:rounded-t-lg last:rounded-b-lg transition-all text-nowrap ${index == menu.length - 1 ? "" : "border-b border-white/20"} px-3`}
                  onClick={() => {
                    onClick(item.route);
                    setIsOpen(false);
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                >
                  {item.title}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyBadge;
