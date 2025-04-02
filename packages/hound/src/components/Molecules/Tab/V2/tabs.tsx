import React, { createContext, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const tabsVariants = tv({
  base: "w-full",
});

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: "default" | "primary" | "secondary";
};

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined,
);

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  defaultValue: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
}

export function Tabs({
  defaultValue,
  children,
  className,
  variant = "default",
  ...props
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={tabsVariants({ className })} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
