import React from "react";
import { tv } from "tailwind-variants";

export const ConnectionCard = ({
  icon,
  destination,
  className,
  children,
}: {
  icon: React.ReactNode;
  destination: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const cardClassName = tv({
    base: "h-full w-full text-white rounded-lg p-6 bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.10)] border-[1px] border-white border-opacity-20 flex flex-col justify-start",
  });
  return (
    <div className={cardClassName()}>
      <div className="flex items-center gap-2">
        <span className="w-[40px] h-[40px]">{icon}</span>
        <span className="body-1 font-medium">{destination}</span>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};
