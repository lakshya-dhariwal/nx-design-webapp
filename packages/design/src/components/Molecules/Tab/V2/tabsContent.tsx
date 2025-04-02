import React, { useContext } from "react";
import { tv } from "tailwind-variants";
import { TabsContext } from "./tabs";

const tabsContentVariants = tv({
  base: "mt-2",
});

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({
  value,
  children,
  className,
  ...props
}: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("TabsContent must be used within a Tabs component");

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return (
    <div className={tabsContentVariants({ className })} {...props}>
      {children}
    </div>
  );
}
