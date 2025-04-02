import React, { useState, useCallback } from "react";
import { ChannelItem, ChannelProps } from "@/types";
import { tv } from "tailwind-variants";
import { motion } from "framer-motion";

const ChannelSelector: React.FC<ChannelProps> = ({
  menuList,
  onChange,
  className,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChannelItem | null>(
    defaultValue || menuList[0],
  );

  const handleItemClick = useCallback(
    (item: ChannelItem) => {
      setSelectedItem(item);
      onChange(item);
      setIsOpen(false);
    },
    [onChange],
  );

  const itemClassName = tv({
    base: "flex items-center w-full p-3 gap-2 transition-all ease-in-out duration-300 cursor-pointer",
    variants: {
      isActive: {
        true: "bg-primary-400 rounded",
        false: "hover:bg-primary-400/20 hover:rounded-xl",
      },
    },
  });

  const channelClassName = tv({
    base: "text-white backdrop-blur-2xl transition-all ease-in-out duration-700 space-y-2 rounded-xl",
    variants: {
      isOpen: {
        true: "bg-black bg-opacity-40",
        false: "bg-white bg-opacity-10",
      },
    },
  });

  return (
    <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={channelClassName({ isOpen, className })}
      initial={{ width: "fit-content" }}
      animate={{
        width: "fit-content",
        transition: { duration: 0.3 },
      }}
    >
      {menuList.map((item: ChannelItem) => (
        <div
          onClick={() => handleItemClick(item)}
          key={item.key}
          className={itemClassName({
            isActive: item.key === selectedItem?.key,
          })}
        >
          {item.icon ? (
            <span className="w-[18px] h-[18px] text-white">{item.icon}</span>
          ) : (
            <div className="w-6 h-6 bg-white"></div>
          )}
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                width: isOpen ? "auto" : 0,
                transition: { duration: 0.3 },
              }}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              className={`body-3 font-medium`}
            >
              {item.label}
            </motion.span>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default ChannelSelector;
