import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const tabsListVariants = tv({
  base: "flex",
  variants: {
    layout: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
});

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  children: React.ReactNode;
}

export function TabsList({
  children,
  layout,
  className,
  ...props
}: TabsListProps) {
  return (
    <div className={tabsListVariants({ layout, className })} {...props}>
      {children}
    </div>
  );
}
