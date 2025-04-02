import { AnimatePresence, motion } from "framer-motion";
import React, { useState, createContext, useContext, ReactNode } from "react";
import { IoInformationCircleOutline, IoChevronUp } from "react-icons/io5";
import { tv } from "tailwind-variants";
import { Tooltip } from "../../Misc/Tooltip";

// Context type for sharing expansion state between Card and its sub-components
interface CardContextType {
  expanded: boolean;
  toggleExpand: () => void;
  expandable?: boolean;
  variant?: "default" | "plain" | "expandable";
}

const CardContext = createContext<CardContextType | undefined>(undefined);

// Props interface for the main Card component
interface CardProps {
  heading?: string; // Optional card header text
  subheading?: string; // Optional card subheader text
  icon?: React.ReactNode; // Optional icon component
  info?: string; // Optional tooltip information
  expandable?: boolean; // Whether card can be expanded
  elements?: React.ReactNode[]; // Additional header elements (e.g., buttons)
  children: ReactNode; // Card content
  variant?: "default" | "plain" | "expandable"; // Visual style variants
  className?: string; // Additional CSS classes
  borderColor?: string; // Custom border color
  isExpanded?: boolean; // Control expansion state externally
  onExpandChange?: (expanded: boolean) => void; // Callback for expansion changes
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  PrimaryContent: React.FC<ContentProps>;
  SecondaryContent: React.FC<ContentProps>;
} = ({
  heading,
  subheading,
  icon,
  info,
  expandable,
  elements,
  children,
  className,
  borderColor,
  variant = "default",
  isExpanded,
  onExpandChange,
}) => {
  // Local state for uncontrolled expansion
  const [localExpanded, setLocalExpanded] = useState(false);

  // Use external state if provided, otherwise use local state
  const expanded = isExpanded !== undefined ? isExpanded : localExpanded;

  // Handle expansion toggle with support for both controlled and uncontrolled modes
  const toggleExpand = () => {
    if (expandable) {
      if (onExpandChange) {
        onExpandChange(!expanded); // Controlled mode: notify parent
      } else {
        setLocalExpanded(!expanded); // Uncontrolled mode: use internal state
      }
    }
  };

  // Tailwind variants for card styling
  const cardClassName = tv({
    base: "h-auto w-full border-[1px]",
    variants: {
      variant: {
        default:
          "text-white rounded-lg p-6 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.10)]",
        plain: "text-white",
        expandable:
          "text-white rounded-lg bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.10)]",
      },
    },
  });

  // Apply default or custom border styling
  const defaultBorderClass = "border-white border-opacity-20";
  const borderColorClass = borderColor || defaultBorderClass;

  return (
    // Provide expansion state and controls to child components
    <CardContext.Provider
      value={{ expanded, toggleExpand, expandable, variant }}
    >
      <div className={`${cardClassName({ variant })} ${borderColorClass}`}>
        {/* Render header section if any header-related props are provided */}
        {(heading || subheading || elements || icon) && (
          <div className="flex justify-between w-full">
            {/* Left side: Icon, heading, and subheading */}
            <div className="flex items-center">
              {icon && <div className="mr-2">{icon}</div>}
              <div>
                {heading && (
                  <h1 className="body-1 flex items-center gap-2">
                    {heading}
                    {/* Render info tooltip if provided */}
                    {info && (
                      <Tooltip placement="top-end" content={info}>
                        <span>
                          <IoInformationCircleOutline size={20} />
                        </span>
                      </Tooltip>
                    )}
                  </h1>
                )}
                {subheading && (
                  <h2 className="body-6 mt-1 opacity-60">{subheading}</h2>
                )}
              </div>
            </div>

            {/* Right side: Additional elements and expand button */}
            <div className="flex items-center gap-3">
              {elements?.map((element, index) => (
                <div key={index}>{element}</div>
              ))}
              {expandable && (
                <motion.div
                  className="cursor-pointer"
                  onClick={toggleExpand}
                  animate={{ rotate: expanded ? 180 : 0 }}
                >
                  <IoChevronUp size={20} />
                </motion.div>
              )}
            </div>
          </div>
        )}
        {/* Render card content */}
        <div
          className={`${heading || subheading || elements || icon ? "mt-5" : ""} ${className || ""}`}
        >
          {children}
        </div>
      </div>
    </CardContext.Provider>
  );
};

const PrimaryContent: React.FC<ContentProps> = ({ children, className }) => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("PrimaryContent must be used within a Card");
  }
  const { expanded, toggleExpand, expandable, variant } = context;
  return (
    <section className={"flex items-center justify-between"}>
      <div className={className + " w-full"}>{children}</div>
      {expandable && (
        <button
          className="text-white opacity-90 hover:opacity-100"
          onClick={toggleExpand}
        >
          {
            <IoChevronUp
              className={`transform ease-in-out duration-300 ${variant === "expandable" ? "mr-6" : ""} ${expanded ? "" : "rotate-180"}`}
              size={24}
            />
          }
        </button>
      )}
    </section>
  );
};

const SecondaryContent: React.FC<ContentProps> = ({ children, className }) => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("SecondaryContent must be used within a Card");
  }
  const { expanded } = context;

  if (!expanded) return null;

  return (
    <AnimatePresence>
      {expanded && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            duration: 0.3,
            height: {
              type: "spring",
              damping: 30,
              stiffness: 300,
            },
          }}
          className={`mt-3 overflow-hidden ${className || ""}`}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

Card.PrimaryContent = PrimaryContent;
Card.SecondaryContent = SecondaryContent;

export default Card;
