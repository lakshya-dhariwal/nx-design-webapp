import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

export interface SeriesConfig {
  key: string;
  color: string;
  name?: string;
}

export interface GroupBarChartData {
  name: string;
  [key: string]: string | number; // Allow for dynamic series data
}

export interface GroupBarChartProps {
  data: GroupBarChartData[];
  width?: number | string;
  height?: number;
  series: SeriesConfig[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  barGap?: number;
  barSize?: number;
  showGrid?: boolean;
  axisColor?: string;
  customTooltip?: (props: TooltipProps<any, any>) => React.ReactNode;
}

const defaultTooltip = (props: TooltipProps<any, any>) => {
  const { active, payload, label } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-700">
      <div className="text-gray-200 font-semibold mb-2">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-gray-300">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const GroupBarChart: React.FC<GroupBarChartProps> = ({
  data,
  width = "100%",
  height = 400,
  series,
  xAxisLabel,
  yAxisLabel,
  barGap = 0,
  barSize = 20,
  showGrid = true,
  axisColor = "#6B7280",
  customTooltip,
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 40,
          bottom: 20,
        }}
        barGap={barGap}
        barSize={barSize}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
        )}
        <XAxis
          dataKey="name"
          stroke={axisColor}
          label={
            xAxisLabel
              ? {
                  value: xAxisLabel,
                  position: "bottom",
                  style: { fill: axisColor },
                }
              : undefined
          }
          tick={{ fill: axisColor }}
          axisLine={{ stroke: axisColor }}
        />
        <YAxis
          stroke={axisColor}
          label={
            yAxisLabel
              ? {
                  value: yAxisLabel,
                  angle: 0,
                  position: "top",
                  offset: 20,
                  dy: 0,
                  style: { fill: axisColor },
                }
              : undefined
          }
          tick={{ fill: axisColor }}
          axisLine={{ stroke: axisColor }}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={customTooltip || defaultTooltip}
        />
        {series.map(({ key, color, name }) => (
          <Bar
            key={key}
            dataKey={key}
            name={name || key}
            fill={color}
            radius={[4, 4, 0, 0]}
            cursor="pointer"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GroupBarChart;
