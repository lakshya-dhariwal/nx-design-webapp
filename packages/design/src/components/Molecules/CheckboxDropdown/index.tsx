import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  useClick,
  useDismiss,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { tv } from "tailwind-variants";

export interface Option {
  id: string;
  label: string;
  checked: boolean;
  badge?: React.ReactNode;
}

export interface CheckboxDropdownProps {
  children: React.ReactNode;
  options: Option[];
  onChange: (options: Option[]) => void;
  onSelectAll?: (checked: boolean) => void;
  className?: string;
  position?: "bottom" | "top";
  footer?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  size?: "sm" | "md";
  disabled?: boolean;
}

const dropDownButtonClassName = tv({
  base: "bg-white w-full bg-opacity-10 transition-all ease-in-out duration-300 text-white flex items-center justify-between focus:outline-0",
  variants: {
    size: {
      sm: "body-5 font-medium rounded-md p-2 gap-4",
      md: "body-3 rounded-xl p-3 gap-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const dropdownContentClassName = tv({
  base: "rounded-md shadow-lg bg-tooltip bg-opacity-40 backdrop-blur-2xl z-[2000]",
});

const menuItemClassName = tv({
  base: "flex items-center justify-between space-x-2 px-4 py-2 text-sm text-white transition-all ease-in-out duration-200 focus:outline-0 cursor-pointer border-b border-white/10",
  variants: {
    state: {
      default: "hover:bg-tooltip/60",
      disabled: "text-white/50 cursor-not-allowed",
      active: "bg-white/20",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const selectAllItemClassName = tv({
  base: "flex items-center justify-start space-x-2 px-4 py-2 text-sm text-white transition-all ease-in-out duration-200 focus:outline-0 cursor-pointer border-b border-white/10",
  variants: {
    state: {
      default: "hover:bg-tooltip/60",
      disabled: "text-white/50 cursor-not-allowed",
      active: "bg-white/20",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({
  children,
  options,
  onChange,
  onSelectAll,
  className,
  position = "bottom",
  footer,
  isOpen: controlledIsOpen,
  setIsOpen,
  size = "md",
  disabled = false,
}) => {
  const { refs, floatingStyles, context } = useFloating({
    placement: position === "bottom" ? "bottom-start" : "top-start",
    open: controlledIsOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleSelectAll = (checked: boolean) => {
    if (onSelectAll) {
      onSelectAll(checked);
    } else {
      const updatedOptions = options.map((option) => ({
        ...option,
        checked,
      }));
      onChange(updatedOptions);
    }
  };

  const handleOptionChange = (optionId: string, checked: boolean) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, checked } : option,
    );
    onChange(updatedOptions);
  };

  const allChecked = options.every((option) => option.checked);
  const someChecked = options.some((option) => option.checked);

  return (
    <div className={className}>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        disabled={disabled}
        className={dropDownButtonClassName({ size })}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300 ease-in-out",
            controlledIsOpen && "transform rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {controlledIsOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <motion.div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className={dropdownContentClassName()}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.03, ease: "easeInOut" }}
              >
                <div>
                  <motion.label
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.02, ease: "easeInOut" }}
                    className={selectAllItemClassName()}
                  >
                    <input
                      type="checkbox"
                      checked={allChecked}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = someChecked && !allChecked;
                        }
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-input bg-transparent"
                      disabled={disabled}
                    />
                    <span>Select All</span>
                  </motion.label>

                  {options.map((option, index) => (
                    <motion.label
                      key={option.id}
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: (index + 1) * 0.02,
                        ease: "easeInOut",
                      }}
                      className={menuItemClassName()}
                    >
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          checked={option.checked}
                          onChange={(e) =>
                            handleOptionChange(option.id, e.target.checked)
                          }
                          className="rounded border-input bg-transparent"
                          disabled={disabled}
                        />
                        <span>{option.label}</span>
                      </div>
                      {option.badge && (
                        <div className="ml-auto">{option.badge}</div>
                      )}
                    </motion.label>
                  ))}
                </div>
                {footer}
              </motion.div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  );
};
