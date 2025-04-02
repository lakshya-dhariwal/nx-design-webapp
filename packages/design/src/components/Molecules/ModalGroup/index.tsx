import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { tv } from "tailwind-variants";
import { Button } from "@/components";
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

const modal = tv({
  base: [
    // Structure & Layout
    "relative",
    "min-w-[600px]",
    "min-h-[200px]",
    "max-h-[90vh]",
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
      warning: "",
      success: "",
    },
  },
});

const overlay = tv({
  base: [
    "fixed",
    "inset-0",
    "grid",
    "place-items-center",
    "overflow-y-auto",
    "overscroll-contain",
    "touch-none",
    "p-4",
  ],
});

const header = tv({
  base: [
    // Layout
    "flex",
    "justify-between",
    "items-center",
    "bg-inherit",
    "w-full",

    // Typography
    "text-xl",
    "font-medium",

    // Visual

    "sticky",
    "top-0",
    "z-10",
  ],
  variants: {
    space: {
      default: "px-6 py-4",
      extra: "p-8 pb-4",
    },
  },
});

const closeButton = tv({
  base: [
    // Base styles
    "p-2",
    "rounded-lg",
    "-mr-2",

    // Colors
    "text-white/70",
    "hover:text-white",
    "hover:bg-white/10",
    "active:bg-white/20",

    // Transitions
    "transition-all",
    "duration-200",

    // Focus states
    "outline-none",

    // Interactive
    "cursor-pointer",
    "select-none",
    "touch-manipulation",
  ],
});

const content = tv({
  base: [
    // Layout
    "relative",
    "flex",
    "flex-col",
    "gap-6",
  ],
  variants: {
    space: {
      default: "p-6",
      extra: "p-8",
    },
  },
});

const navigation = tv({
  base: [
    // Layout
    "flex",
    "justify-between",
    "items-center",
    "gap-4",
    "px-6",
    "py-4",
    "mt-auto",

    // Visual
    "bg-nonUsers/50",
    "backdrop-blur-sm",
    "sticky",
    "bottom-0",
    "z-10",
  ],
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
  slideTransition: {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: {
        x: { duration: 0.2, ease: "easeInOut" },
        opacity: { duration: 0.2 },
      },
    }),
  },
};

interface Step {
  title: React.ReactNode;
  content: React.ReactNode;
}

interface ModalGroupProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  useInternalNavigation?: boolean;
  variant?: "default" | "warning" | "success" | "primary";
  space?: "default" | "extra";
}

const ModalGroup: React.FC<ModalGroupProps> = ({
  isOpen,
  onClose,
  steps,
  currentStep,
  onStepChange,
  onComplete,
  variant = "default",
  useInternalNavigation = true,
  space = "default",
}) => {
  const prevStep = React.useRef(currentStep);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) {
        onClose();
      }
    },
  });

  const click = useClick(context);
  const role = useRole(context);
  const { getFloatingProps } = useInteractions([click, role]);

  const labelId = useId();
  const descriptionId = useId();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const getDirection = React.useCallback(
    (current: number, previous: number) => {
      return current > previous ? 1 : -1;
    },
    [],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay lockScroll key={isOpen ? "open" : "closed"}>
            <motion.div
              className={overlay()}
              variants={animationVariants.overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <FloatingFocusManager context={context}>
                <motion.div
                  ref={refs.setFloating}
                  aria-labelledby={labelId}
                  aria-describedby={descriptionId}
                  {...getFloatingProps()}
                  variants={animationVariants.modal}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={modal({ variant: variant })}
                >
                  <header className={header({ space })}>
                    <AnimatePresence
                      mode="wait"
                      custom={getDirection(currentStep, prevStep.current)}
                      initial={false}
                    >
                      <motion.h2
                        key={`title-${currentStep}`}
                        variants={animationVariants.slideTransition}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={getDirection(currentStep, prevStep.current)}
                        id={labelId}
                        className="flex items-center gap-4"
                      >
                        {steps[currentStep].title}
                      </motion.h2>
                    </AnimatePresence>

                    <button
                      onClick={onClose}
                      className={closeButton()}
                      aria-label="Close dialog"
                    >
                      <IoClose size={24} />
                    </button>
                  </header>

                  <div className={content({ space })}>
                    <AnimatePresence
                      mode="wait"
                      custom={getDirection(currentStep, prevStep.current)}
                      initial={false}
                    >
                      <motion.div
                        key={currentStep}
                        variants={animationVariants.slideTransition}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={getDirection(currentStep, prevStep.current)}
                        id={descriptionId}
                        role="region"
                        aria-label={`Step ${currentStep + 1} of ${steps.length}`}
                      >
                        {steps[currentStep].content}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {useInternalNavigation && (
                    <div className={navigation()}>
                      <Button
                        variant="secondary"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        aria-label="Previous step"
                      >
                        Go Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        aria-label={
                          currentStep === steps.length - 1
                            ? "Complete steps"
                            : "Next step"
                        }
                      >
                        {currentStep === steps.length - 1
                          ? "Finish"
                          : "Continue"}
                      </Button>
                    </div>
                  )}
                </motion.div>
              </FloatingFocusManager>
            </motion.div>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
};

export default ModalGroup;
