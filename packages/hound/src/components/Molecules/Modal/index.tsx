import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { tv } from "tailwind-variants";
import { CiWarning } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import {
  useFloating,
  useClick,
  useInteractions,
  useRole,
  FloatingFocusManager,
  useId,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";

// Separated variants for better organization and reuse
const modal = tv({
  base: [
    // Structure & Layout
    "relative",
    "w-auto",
    "max-w-[90vw]",
    "text-white",

    "shadow-xl",
    "rounded-2xl",
    "overflow-y-scroll",
    "overflow-x-hidden",
    // Focus states
    "outline-none",
  ],
  variants: {
    variant: {
      default: "bg-nonUsers text-white border-2 border-primary-400",
      primary:
        "bg-[linear-gradient(158deg,_rgba(79,_183,_221,_0.05)_0%,_rgba(79,_183,_221,_0.10)_100%)] backdrop-blur-xl",
      warning: "bg-nonUsers text-white border-2 border-primary-400",
      success: "bg-nonUsers text-white border-2 border-primary-400",
    },
  },
});

const overlay = tv({
  base: [
    // Layout
    "fixed",
    "inset-0",
    "grid",
    "place-items-center",
    // Scrolling behavior
    "overflow-y-auto",
    // Better touch behavior
    "touch-none",
  ],
});

const header = tv({
  base: ["flex", "justify-between", "items-center", "mb-4"],
});

const modalTitle = tv({
  base: ["text-xl", "font-semibold", "flex", "items-center w-full"],
});

const closeButton = tv({
  base: [
    "p-1",
    "rounded-full",
    "transition-colors",
    "duration-200",
    "hover:bg-gray-200",
    "hover:text-nonUsers",
    "focus:outline-none",
  ],
});

const content = tv({
  base: ["relative", "flex-auto"],
  variants: {
    space: {
      default: "p-6",
      extra: "p-8",
    },
  },
});

const variantIcon = tv({
  base: ["mr-2", "w-6", "h-6", "flex-shrink-0"],
  variants: {
    type: {
      warning: "text-warning-300",
      success: "text-success-500",
    },
  },
});

const animationVariants = {
  overlay: {
    hidden: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
  modal: {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  },
};

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  variant?: "default" | "warning" | "success" | "primary";
  title?: React.ReactNode;
  space?: "default" | "extra";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = "default",
  title,
  space = "default",
}) => {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open && onClose) {
        onClose();
      }
    },
  });

  const click = useClick(context);
  const role = useRole(context);
  const { getFloatingProps } = useInteractions([click, role]);

  const labelId = useId();
  const descriptionId = useId();

  function renderVariantIcon(variant: string) {
    const iconProps = {
      className: variantIcon({ type: variant as "warning" | "success" }),
    };

    switch (variant) {
      case "warning":
        return <CiWarning {...iconProps} />;
      case "success":
        return <FaCheckCircle {...iconProps} />;
      default:
        return null;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay lockScroll>
            <motion.div
              className={overlay()}
              variants={animationVariants.overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <FloatingFocusManager context={context}>
                <div className="w-full min-h-full p-4 grid place-items-center">
                  <motion.div
                    ref={refs.setFloating}
                    aria-labelledby={labelId}
                    aria-describedby={descriptionId}
                    {...getFloatingProps()}
                    variants={animationVariants.modal}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={modal({ variant })}
                  >
                    <div className={content({ space })}>
                      <div className={header()}>
                        {title && (
                          <h2 id={labelId} className={modalTitle()}>
                            {renderVariantIcon(variant)}
                            {title}
                          </h2>
                        )}
                        {onClose && (
                          <button
                            onClick={onClose}
                            className={closeButton()}
                            aria-label="Close dialog"
                          >
                            <IoClose size={20} />
                          </button>
                        )}
                      </div>
                      <div id={descriptionId}>{children}</div>
                    </div>
                  </motion.div>
                </div>
              </FloatingFocusManager>
            </motion.div>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
};

export default Modal;
