import React, { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { TabsContext } from "./tabs";

const tabsTriggerVariants = tv({
  slots: {
    root: "text-white transition-all ease-in-out duration-300",
    background: "",
  },
  variants: {
    variant: {
      default: {
        root: "p-4 font-bold rounded-lg border bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white border-opacity-20",
      },
      primary: {
        root: "px-4 py-2 font-medium",
      },
      secondary: {
        root: "px-4 py-2 font-bold text-sm rounded-lg border bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white border-opacity-20",
      },
    },
    state: {
      active: "",
      inactive: "",
    },
    size: {
      default: { root: "text-lg" },
      small: { root: "text-sm" },
      xsmall: { root: "text-xs" },
    },
  },
  compoundVariants: [
    {
      variant: "default",
      state: "active",
      class: {
        background: "opacity-100",
      },
    },
    {
      variant: "default",
      state: "inactive",
      class: {
        background: "opacity-40",
      },
    },
    {
      variant: "primary",
      state: "active",
      class: {
        background: " bg-primary-400",
      },
    },
    {
      variant: "primary",
      state: "inactive",
      class: {
        background: "bg-white bg-opacity-20 backdrop-blur-2xl",
      },
    },
    {
      variant: "secondary",
      state: "active",
      class: {
        background: "opacity-100",
      },
    },
    {
      variant: "secondary",
      state: "inactive",
      class: {
        background: "opacity-40",
      },
    },
  ],
  defaultVariants: {
    state: "inactive",
    variant: "default",
    size: "default",
  },
});

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
}

export function TabsTrigger({
  value,
  children,
  className,
  size = "default",
  onClick,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("TabsTrigger must be used within a Tabs component");

  const { activeTab, setActiveTab, variant } = context;
  const isActive = activeTab === value;

  const { root, background } = tabsTriggerVariants({
    state: isActive ? "active" : "inactive",
    variant,
    size,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(value);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`${root()} ${background()} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
