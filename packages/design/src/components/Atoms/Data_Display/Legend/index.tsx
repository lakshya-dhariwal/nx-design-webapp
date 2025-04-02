import React from "react";

interface LegendProps {
  name: string;
  color: string;
  className?: string;
}

const Legend: React.FC<LegendProps> = ({ name, color, className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div
        style={{ backgroundColor: color }}
        className="w-3 h-3 rounded-full"
      />
      <span className="text-sm text-white opacity-60">{name}</span>
    </div>
  );
};

export default Legend;
