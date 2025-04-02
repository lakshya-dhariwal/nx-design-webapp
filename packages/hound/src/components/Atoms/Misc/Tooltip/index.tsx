import React, { useState } from "react";
import { tv } from "tailwind-variants";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: Placement;
  className?: string;
  variants?: "default" | "custom";
}

const tooltipVariants = tv({
  base: "",
  variants: {
    variants: {
      default: "z-50 px-2 py-1 text-sm text-white bg-tooltip rounded",
      custom: "",
    },
  },
});

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  className,
  variants = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  const ref = useMergeRefs([refs.setReference, (children as any).ref]);

  return (
    <>
      {React.cloneElement(
        children,
        getReferenceProps({ ref, ...children.props }),
      )}
      <FloatingPortal>
        {isMounted && (
          <div
            ref={refs.setFloating}
            className={tooltipVariants({ variants, className })}
            style={{
              ...transitionStyles,
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {content}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
