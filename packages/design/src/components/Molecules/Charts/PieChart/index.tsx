import React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Configuration for each data series in the pie chart
 */
export interface SeriesConfig {
  /** Key that matches with the data property */
  key: string;
  /** Color to be used for this segment */
  color: string;
  /** Display name for the segment (optional, defaults to key) */
  name?: string;
}

/**
 * Data structure for pie chart entries
 */
export interface PieChartData {
  /** Name of the data point */
  name: string;
  /** Dynamic key-value pairs matching series configuration */
  [key: string]: string | number;
}

/**
 * Props for the PieChart component
 */
export interface PieChartProps {
  /** Array of data points */
  data: PieChartData[];
  /** Series configuration defining how to display each segment */
  series: SeriesConfig[];
  /** Width of the chart container (default: '100%') */
  width?: number | string;
  /** Height of the chart container (default: 400) */
  height?: number;
  /** Inner radius of the donut chart (default: '60%') */
  innerRadius?: number | string;
  /** Outer radius of the donut chart (default: '80%') */
  outerRadius?: number | string;
  /** Angle of padding between segments in degrees (default: 2) */
  paddingAngle?: number;
  /** Duration of the animation in milliseconds (default: 400) */
  animationDuration?: number;
  /** Animation timing function (default: 'ease') */
  animationEasing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
}

/**
 * Custom label renderer for pie segments
 */
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  percent,
  name,
}: any) => {
  const radius = Number(innerRadius) * 0.6;
  const RADIAN = Math.PI / 180;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // if (percent < 0.05) return null;

  return (
    <g>
      <text
        x={x}
        y={y - 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="bottom"
        className="text-sm font-medium"
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="top"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  series,
  width = "100%",
  height = 400,
  innerRadius = "60%",
  outerRadius = "80%",
  paddingAngle = 2,
  animationDuration = 600,
  animationEasing = "ease",
}) => {
  const pieData = series.map(({ key, name }) => ({
    name: name || key,
    value: data.reduce((sum, item) => sum + (Number(item[key]) || 0), 0),
  }));

  return (
    <div className="[&_.recharts-sector]:outline-none [&_.recharts-pie-sector]:focus:outline-none">
      <ResponsiveContainer width={width} height={height}>
        <RechartsPieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            label={renderCustomizedLabel}
            labelLine={false}
            paddingAngle={paddingAngle}
            strokeWidth={0}
            animationDuration={animationDuration}
            animationEasing={animationEasing}
            isAnimationActive={true}
            className="outline-none"
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={series[index].color}
                className="outline-none"
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
