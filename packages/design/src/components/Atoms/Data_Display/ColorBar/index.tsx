import React from "react";
import { tv } from "tailwind-variants";
import { Tooltip } from "../../Misc/Tooltip";

interface DataItem {
  value: number;
  color: string;
  label: string;
  tooltipContent?: React.ReactNode;
}

interface BarFillProps {
  className?: string;
  data: DataItem[];
}

const barFillVariants = tv({
  base: "flex w-full h-4 rounded-full overflow-hidden relative",
});

const tooltipVariants = tv({
  base: "bg-tooltip/40 backdrop-blur-2xl text-white p-2 rounded text-sm whitespace-nowrap",
});

const BarFill: React.FC<BarFillProps> = ({ className, data }) => {
  // Calculate the total value
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={barFillVariants({ className })}>
      {data.map((item, index) => {
        // Calculate the width percentage for each item
        const widthPercentage = (item.value / totalValue) * 100;

        return (
          <Tooltip
            variants="custom"
            content={
              <div className={tooltipVariants()}>
                {item.tooltipContent || (
                  <div className="flex items-center min-w-[300px] justify-between">
                    <div>{item.label}</div>
                    <div className="flex">
                      {item.value.toLocaleString()} (
                      {widthPercentage.toFixed(2)}%)
                    </div>
                  </div>
                )}
              </div>
            }
          >
            <div
              key={index}
              className={`${item.color} relative`}
              style={{
                width: `${widthPercentage}%`,
                backgroundColor: item.color,
              }}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export default BarFill;
